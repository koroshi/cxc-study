class Model{
    constructor(){

    }
    // async generateAccessToken(){
    //     return "testaccesstoken"
    // }
    async getAccessToken(accessToken){
        console.log('getAccessToken', accessToken)
        return {
            accessToken: accessToken,
            client:{
                id:'testid'
            },
            user:{
                name:"testuser"
            },
            accessTokenExpiresAt: new Date("2017-12-30 0:0:0")
        };
    }

    async getRefreshToken(refreshToken){
        console.log('getRefreshToken', refreshToken)
        return {
            refreshToken: refreshToken,
            client: {
                id: 'testid'
            },
            user: {
                name: "testuser"
            }

        };

    }

    async getAuthorizationCode(authorizationCode){
        console.log('getAuthorizationCode', authorizationCode)
        return {
            code:"testcode",
            expiresAt: new Date('2017-12-30 0:0:0'),
            client:{
                id:"testid"
            },
            user:{
                name: "testuser"
            }
        }
    }

    async getClient(clientId, clientSecret){
        console.log('getClient')
        console.log('clientId', clientId)
        console.log('clientSecret', clientSecret)
        return {
                id:"testid",
                // grants: "client_credentials"
                grants: [
                    // "authorization_code",
                    "client_credentials"
                    // "refresh_token",
                    // "password",
                ]
                
        }
    }

    async getUser(username, password){
        console.log('getUser')
        console.log('getUser username', username)
        console.log('getUser password', password)
        return {
            name: "testuser"
        }
    }

    async getUserFromClient(client){
        console.log('getUserFromClient')
        console.log('getUserFromClient client', client)
        return {
            name: "testuser"
        }
    }

    async saveToken(token, client, user){
        console.log('saveToken')
        console.log(token)
        console.log(client)
        console.log(user)
        // return token
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken:"testrefreshToken",
            refreshTokenExpiresAt: new Date('2017-12-30 0:0:0'),
            client:{
                id: client.id,
                grants: client.grants,
            },
            user:{
                name: user.name
            }
        }
    }

    async saveAuthorizationCode(code, client, user){
        console.log('saveAuthorizationCode')
        console.log('saveAuthorizationCode code', code)
        console.log('saveAuthorizationCode client', client)
        console.log('saveAuthorizationCode user', user)
        return {
            authorizationCode:'',
            expiresAt: new Date('2017-12-30 0:0:0'),
            redirectUri:"www.baidu.com",
            client: {
                id: "testid",
            },
            user: {
                name: "testuser"
            }
        }
    }

    async revokeToken(token){
        console.log('revokeToken')
        console.log('revokeToken,', revokeToken)
        return true;
    }

    async revokeAuthorizationCode(code){
        console.log('revokeAuthorizationCode')
        console.log('revokeAuthorizationCode code', code)
        return true;
    }

    async validateScope(user, client, scope){
        console.log('validateScope')
        console.log('validateScope user', user)
        console.log('validateScope client', client)
        console.log('validateScope scope', scope)
        return scope;
    }

    async verifyScope(accessToken, scope){
        console.log('verifyScope')
        console.log('verifyScope accessToken', accessToken)
        console.log('verifyScope scope', scope)
        return true;
    }

}
var model = new Model;
// async function b() {
//     var a =  model.getClient();

//     console.log(a)
//     console.log(a.client.grants)
//     console.log("kljlkj")
// }
// b()

// let outModel ={

// }
// let a = new Model();
// console.log(a.getAccessToken)

// module.exports = new model
module.exports = model 