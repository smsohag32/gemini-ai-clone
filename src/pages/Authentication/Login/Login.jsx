import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();

   const loginUser = () => {
      navigate('/app');
   };

   return (
      <div className="flex items-center justify-center min-h-screen">
         <Button onClick={loginUser}>Login</Button>
      </div>
   );
};

export default Login;
