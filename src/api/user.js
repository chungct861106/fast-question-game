import axios from "axios";

class User {
  constructor(token) {
    this.token = token;
    this.server = process.env.REACT_APP_BACKEND_HOST;
  }
}

User.prototype.Login = async function(params) {
  try {
    return await axios.put(this.server + "/user/login", params);
  } catch (err) {
    return err.response;
  }
};
User.prototype.Create = async function(params) {
  try {
    return await axios.post(this.server + "/user/create", params);
  } catch (err) {
    return err.response;
  }
};

User.prototype.Active = async function(token) {
  try {
    return await axios.post(
      this.server + "/user/active",
      {},
      {
        headers: { Authorization: token },
      }
    );
  } catch (err) {
    return err.response;
  }
};

User.prototype.GetUsers = async function() {
  try {
    return await axios.get(this.server + "/user/data", {
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};

User.prototype.Remind = async function(email) {
  try {
    return await axios.put(this.server + "/user/remind", { email });
  } catch (err) {
    return err.response;
  }
};

User.prototype.Resend = async function(email) {
  try {
    return await axios.put(this.server + "/user/resend", { email });
  } catch (err) {
    return err.response;
  }
};

export default User;
