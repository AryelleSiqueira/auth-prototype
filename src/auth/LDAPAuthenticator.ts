import ldap from 'ldapjs';
import { SearchOptions } from 'ldapjs';
import ssha from 'ssha';

const ldapServer = process.env.LDAP_SERVER ? process.env.LDAP_SERVER : 'ldap://localhost:389';
const ldapBaseDN = process.env.LDAP_BASE_DN ? process.env.LDAP_BASE_DN : 'ou=aluno,dc=inf,dc=ufes,dc=br';
const ldapUser = process.env.LDAP_USER ? process.env.LDAP_USER : 'cn=admin,dc=inf,dc=ufes,dc=br';
const ldapPassword = process.env.LDAP_ADMIN_PASSWORD ? process.env.LDAP_ADMIN_PASSWORD : 'ldappw';

export class LDAPAuthenticator {
  private ldapClient: ldap.Client;

  constructor() {
    this.ldapClient = ldap.createClient({ url: ldapServer, });
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      this.ldapClient.bind(ldapUser, ldapPassword, (err) => {
        if (err) {
          console.error('Erro ao conectar com o servidor LDAP:', err);
          reject(false);
        }

        let searchOptions: SearchOptions = {
          filter: `(mail=${email})`,
          scope: 'sub',
          attributes: ['userPassword'],
        };

        this.ldapClient.search(ldapBaseDN, searchOptions, (err, res) => {
          if (err) {
            console.error('Erro ao buscar usuário no servidor LDAP:', err);
            reject(false);
          }
          let authenticated = false;
  
          res.on('searchEntry', (entry) => {
            const userPassword = entry.attributes[0].vals[0];

            if (this.verifySSHA(password, userPassword)) {
              authenticated = true;
            }
          });
  
          res.on('error', (err) => {
            console.error('Erro na busca:', err);
            reject(false);
          });
  
          res.on('end', () => {
            this.ldapClient.unbind((err) => {
              if (err) {
                console.error('Erro ao fechar conexão:', err);
                reject(false);
              } else {
                console.log('Conexão encerrada com sucesso.');
                resolve(authenticated);
              }
            });
          });
        });
      });
    });
  }

  private verifySSHA(password: string, hashedPassword: string) {
    return ssha.verify(password, hashedPassword);
  }
}