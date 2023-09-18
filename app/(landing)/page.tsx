import { Button } from '@/components/ui/button';
import Link from 'next/link';

const landingPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link href="/sign-in">
          <Button>Sign-In</Button>
        </Link>
      </div>
      <div>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default landingPage;