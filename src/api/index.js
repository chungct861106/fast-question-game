import { useUser } from "../context/user";
import Question from "./question";
import User from "./user";

function useService() {
  const { userInfo } = useUser();
  const services = {
    user: new User(userInfo.user_token),
    question: new Question(userInfo.user_token),
  };

  return { services };
}

export default useService;
