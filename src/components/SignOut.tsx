
import { Button } from './ui/button';
import { logout } from '@/lib/helpers';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

const SignOut = () => {
    
  return (
    
      
    <form className='flex justify-center mt-8'
    action={async () => {
      "use server";
      await logout();
      redirect("/");
    }}
  >
    <Button variant={'destructive'} className='flex gap-2 items-center' type="submit">Logout <LogOut/></Button>
  </form>
    
  );
};

export default SignOut