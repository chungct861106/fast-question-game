import axios from "axios";

class Question {
  constructor(token) {
    this.token = token;
    this.server = process.env.REACT_APP_BACKEND_HOST;
  }
}

Question.prototype.Create = async function(parameters) {
  try {
    return await axios.post(this.server + "/question/create", parameters, {
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};
Question.prototype.Update = async function(parameters) {
  try {
    return await axios.post(this.server + "/question/update", parameters, {
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};

Question.prototype.GetQuestions = async function(parameters) {
  try {
    return await axios.get(this.server + "/question/data", {
      params: parameters,
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};

Question.prototype.GetReviews = async function() {
  try {
    return await axios.get(this.server + "/question/reviews", {
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};

Question.prototype.Delete = async function(parameters) {
  try {
    return await axios.delete(this.server + "/question/delete", {
      params: parameters,
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};
Question.prototype.GiveRate = async function(parameters) {
  try {
    return await axios.post(this.server + "/rate", parameters, {
      headers: { Authorization: this.token },
    });
  } catch (err) {
    return err.response;
  }
};

export default Question;
