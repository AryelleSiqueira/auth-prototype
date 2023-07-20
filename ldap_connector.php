<?php

$ldapServer = 'ldap://localhost:389';
$ldapUser = 'cn=admin,dc=inf,dc=ufes,dc=br';
$ldapPassword = 'ldappw';
$ldapBaseDN = 'ou=aluno,dc=inf,dc=ufes,dc=br';

$email = 'aluno@dois.com';
$password = 'ldappw';

$ldapConnection = ldap_connect($ldapServer);
if (!$ldapConnection) {
    echo 'Erro ao conectar com o servidor LDAP';
    exit;
}

ldap_set_option($ldapConnection, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapConnection, LDAP_OPT_REFERRALS, 0);

$bindResult = ldap_bind($ldapConnection, $ldapUser, $ldapPassword);
if (!$bindResult) {
    echo 'Erro ao autenticar com o servidor LDAP';
    exit;
}

$searchFilter = "(mail=$email)";
$searchAttributes = ['userPassword'];
$searchResult = ldap_search($ldapConnection, $ldapBaseDN, $searchFilter, $searchAttributes);

if (!$searchResult) {
    echo 'Erro ao realizar busca no servidor LDAP';
    exit;
}

$entries = ldap_get_entries($ldapConnection, $searchResult);
if ($entries['count'] === 0) {
    echo 'Usuário não encontrado';
    exit;
}

$userPassword = $entries[0]['userpassword'][0];
if (verifySSHA($password, $userPassword)) {
    echo 'Autenticação bem-sucedida';
} else {
    echo 'Senha incorreta';
}

ldap_unbind($ldapConnection);

function verifySSHA($password, $hash)
 {
    if ($hash == '') {
        return FALSE;
    }
    
    if (substr($hash,0,7) == '{crypt}') {
        if (crypt($password, substr($hash,7)) == substr($hash,7))
        return TRUE;
        return FALSE;
    }
    elseif (substr($hash,0,5) == '{MD5}') {
        $encrypted_password = '{MD5}' . base64_encode(md5( $password,TRUE));
    }
    elseif (substr($hash,0,6) == '{SHA1}') {
        $encrypted_password = '{SHA}' . base64_encode(sha1( $password, TRUE ));
    }
    elseif (substr($hash,0,6) == '{SSHA}') {
        $salt = substr(base64_decode(substr($hash,6)),20);
        $encrypted_password = '{SSHA}' . base64_encode(sha1( $password.$salt, TRUE ). $salt);
    }
    else {
        echo "Unsupported password hash format";
        return FALSE;
    }
    
    if ($hash == $encrypted_password)
        return TRUE;
    
    return FALSE;
 }

?>
