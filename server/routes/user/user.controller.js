const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const config = require('../../config');
const auth = require('../auth/auth.service');
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
const utils = require('../../utils/utils')
import { usernameRegex, emailRegex } from '../../utils/validator';
const invitationCode = config.session.invitation;
const crypto = require('crypto');


exports.addUser = async function(req, res) {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const invitation = req.body.invitation;
  const md5 = crypto.createHash('md5');

  var errorType;
  if (email === '') {
    errorType = "emailEmpty";
  } else if (!emailRegex.test(email)) {
    errorType = "invalidEmail";
  } else if (md5.update(invitation).digest('hex') !== invitationCode) {
    errorType = "invalidinvitationCode";
  }
  if (errorType) {
    return res.status(401).send({ errorType: errorType });
  }


  try {
    var checkExist = await User.find({ email: email })

  } catch (err) {
    return res.status(401).send({ errorType: err });
  }

  if (checkExist.length) {
    return res.status(401).send({ errorType: 'alreadyExist' });
  }

  var newUser = new User({
    email: email,
    password: password
  });
  newUser.role = 'user';
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  var savedUser = await newUser.saveAsync();
  var token = auth.signToken(savedUser._id, expiry);
  var userInfo = await User.findById(savedUser._id);

  userInfo = userInfo.userInfo

  res.status(200).send({
    token: token,
    authInfo: userInfo
  })

};

exports.logout = async function(req, res) {

}
exports.forgotPassword = async function(req, res) {
  let email = req.body.email;
  if (!emailRegex.test(email)) {
    return res.status(401).send({
      errorType: `invalidEmail`
    })
  }
  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).send()
  }
  user = await User.findOne({ email: email }).exec((err, user) => {
    user.set('activation')
  });
  user.saveAsync();
  let link = utils.makeForgotPasswordLink(user);
  mailSender('resetPassword', {
    email: email,
    nickname: user.nickname,
    link: link,
    lang: user.lang || 'en-US'
  }, (err) => {
    if (err) {
      res.status(401).send()
    } else {
      res.status(200).send({
        ok: true
      })
    }
  })


}

exports.resendActiveEmail = async function(req, res) {
  let email = req.body.email;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).send({ err: 'emailNotFound' });
  }
  if (user.status) {
    return res.status(401).send({ err: 'alreadyActived' });
  } else {
    mailSender('activation', {
      email: email,
      link: utils.makeActiveLink(user),
      lang: user.lang || 'en-US'

    }, (err) => {
      if (err) {
        return res.status(401).send({ err: 'mailSendFailed' })
      }
      res.status(200).send({ ok: true })

    })
  }
}


exports.emailActivation = async function(req, res) {
  let email = req.body.email;
  let code = req.body.code;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).send({ msg: 'emailNotFound' });
  }
  if (user.status) {
    return res.status(200).send({ msg: 'alreadyActived' });
  } else {
    user.status = 1;
    user.updated = Date.now();
    user.saveAsync();
    return res.status(200).send({
      ok: true
    })

  }
}
exports.skipEmailActivation = async function(req, res) {
  let email = req.body.email;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).send({ msg: 'emailNotFound' });
  }
  if (user.status) {
    return res.status(200).send({ msg: 'alreadyActived' });
  } else {
    user.status = 2;
    user.updated = Date.now();
    user.saveAsync();
    return res.status(200).send({
      ok: true
    })

  }
}


exports.profileSettings = async function(req, res) {
  //console.log(req.headers)
  let userId = req.user.id;
  console.log(req.body)
  try {
    let user = await User.findById(userId)

    if (req.body.avatar) {
      if (req.body.avatar == 'deleted') {
        user.avatar = ''
      } else {
        user.avatar = req.body.avatar

      }

    }
    if (req.body.nickname) {
      user.nickname = req.body.nickname;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.saveAsync()

    res.status(200).send({
      ok: true
    })
  } catch (err) {
    res.status(401).send({
      err: err
    })
  }


}

exports.checkExist = async function(req, res) {
  if (!req.body.email) {
    return res.status(401).send()
  }
  var email = req.body.email.toLowerCase();

  var users = await User.find({ email: email });
  if (users.length) {
    if (users[0].status) {
      res.status(200).send({
        errorType: 'alreadyExist'
      })
    } else {
      res.status(200).send({
        errorType: 'emailInactived'
      })
    }

  } else {
    res.status(200).send({
      ok: true
    })
  }
}




exports.header = function(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = __dirname + '/../../public/uploads/head/';
  form.parse(req, function(err, fields, files) {
    if (err) {
      throw err;
    }

    var img = files.img;
    var path = img.path;
    var type = img.type.split('/')[0];
    if (img.size > 1024 * 1024) {
      fs.unlink(path, function() {
        return res.send({ "error": 0 });
      });
    } else if (type != 'image' && type != 'application') {
      fs.unlink(path, function() {
        return res.send({ "error": 0 });
      });
    } else {
      var urlPath = path.replace(/\\/g, '/');
      var url = config.root + '/public/uploads/head' + urlPath.substr(urlPath.lastIndexOf('/'), urlPath.length);
      var info = {
        "error": 0,
        "url": url
      };

      var id = req.user.id;
      User.findByIdAsync(id).then(function(user) {
        user.header = url;
        return user.saveAsync()
      }).then(function() {
        return res.status(200).send({
          "url": url
        });
      }).catch(function(err) {
        return res.status(401).send(err);
      });
    }
  });
};

exports.userInfo = function(req, res) {
  var uid = req.params.id;
  var id;
  var data;
  var own = false;
  if (req.user) {
    id = req.user.id;
  }
  User.findById(uid)
    .populate('friend', 'username header')
    .exec()
    .then(function(user) {
      data = user.toObject();
      data.userInfo.friend = user.friend;
      if (id == data._id) own = true;
      return Article.count({ authId: data._id })
    }).then(function(articleCount) {
      data.userInfo.articleCount = articleCount;
      data.userInfo.collectCount = data.collectList.length;
      return Album.countAsync({ userId: data._id })
    }).then(function(photoCount) {
      data.userInfo.photoCount = photoCount;
      return res.status(200).send({
        own: own,
        userInfo: data.userInfo
      });
    }).catch(function(err) {
      return res.status(401).send();
    });
};

exports.userSet = function(req, res) {
  var id = req.user.id;
  User.findByIdAsync(id).then(function(user) {
    var own = true;
    return res.status(200).send({
      own: own,
      userInfo: user.userInfo
    });
  }).catch(function(err) {
    return res.status(401).send();
  });
};

exports.updateUser = function(req, res) {
  var id = req.user.id;
  var errorType;



  if (errorType) {
    return res.status(401).send({ errorType: errorType });
  }
  User.findByIdAsync(id).then(function(user) {
    _.assign(user, req.body);

    if (req.body.lang) {
      user.lang = req.body.lang
    }

    user.updated = new Date();
    return user.saveAsync()
  }).then(function(user) {
    return res.status(200).send({
      userInfo: user.userInfo
    })
  }).catch(function(err) {
    if (err.errors && err.errors.username) {
      err = { errorType: err.errors.username.message }
    }
    return res.status(401).send(err);
  })
};

exports.updatePassword = function(req, res) {
  var id = req.user.id;
  var errorType;

  var password = req.body.password;
  var passwordRepeat = req.body.passwordRepeat;
  if (password.length <= 5 || password.length > 15) {
    errorType = "密码不合法";
  } else if (password !== passwordRepeat) {
    errorType = "两次输入的密码不一致";
  }
  if (errorType) {
    return res.status(401).send({ errorType: errorType });
  }

  User.findByIdAsync(id).then(function(user) {
    user.password = password;
    return user.saveAsync()
  }).then(function() {
    return res.status(200).send({
      success: 'true'
    });
  }).catch(function(err) {
    return res.status(401).send(err);
  });
};
