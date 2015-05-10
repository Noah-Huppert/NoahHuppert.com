"use strict";

module.exports = {
  db: {
    url: process.env.SECRETS_DB_URL
  },
  google: {
    clientId: process.env.SECRETS_GOOGLE_CLIENT_ID,
    clientSecret: process.env.SECRETS_GOOGLE_CLIENT_SECRET
  },
  session: {
    secret: process.env.SECRETS_SESSION_SECRET
  }
};
