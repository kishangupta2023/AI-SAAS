import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/home'); // send anyone visiting "/" to "/home"
}