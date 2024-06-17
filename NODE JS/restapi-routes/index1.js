const bcrypt = require("bcrypt")
const workFactor = 8;
const password = "Admin@123"
const hash='$2b$08$XGCGTPoPnPCjN84UWgXHmu5uqhFp4SPpT8oJryJi8y42NM30DuWAa'



// bcrypt
//   .genSalt(workFactor)
//   .then(salt => {
//     console.log(`Salt: ${salt}`);
//     return bcrypt.hash(password, salt);
//   })
//   .then(hash => {
//     console.log(`Hash: ${hash}`);
//   })
//   .catch(err => console.error(err.message));


bcrypt.genSalt(workFactor, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log(`Hash: ${hash}`);
    });
  });


  bcrypt.compare(password, hash, function(err, result) {
    // Password matched
    if (result) {
      console.log("Password verified");
    }
    // Password not matched
    else {
      console.log("Password not verified");
    }
  });