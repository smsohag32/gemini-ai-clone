import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();

   useEffect(() => {
      // Automatically redirect to /app
      navigate('/app');
   }, [navigate]);

   return (
      <div className="flex items-center justify-center min-h-screen">
         <Button onClick={() => navigate('/app')}>Login</Button>
      </div>
   );
};

export default Login;
