module.exports = (username, password, groupname) => {

  return {

    user: {
      username: username,
      password: password
    },

    group: {
      name: groupname,
      permissions: {
        methods: {
          '/DOMAIN_NAME/edgeComponent0/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent1/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent2/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent3/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent4/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent5/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent6/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent7/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent8/*': {
            authorized: true
          },
          '/DOMAIN_NAME/edgeComponent9/*': {
            authorized: true
          }
        }
      }
    }

  }

}
