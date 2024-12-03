import Link from 'next/link'
import Image from 'next/image'
// අපි Install කරගත්ත Auth Js වල Login වෙන Options  Import කරගෙන තියෙනවා
import { auth, signOut, signIn } from "@/auth";

// මෙතනදි async පාවිච්චි කරලා තියෙන්නේ Variable එක හදලා තියෙන තැන Await කියලා පාවිච්චි කරලා තියෙන නිසා
const Navbar = async () => {

    // Session එකට අදාල Variable එක හදාගෙන තියෙන්නෙ මෙතනින් 
    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {/* මෙතනදි Check කරලා තියෙන්නේ Session එකක් තියෙනවද නැද්ද කියලා */}
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type='submit'>Log Out</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>
                                    {session?.user?.name}
                                </span>
                            </Link>

                        </>
                    ) : (
                        // මෙතනදි වෙන්නේ Form එකක් විදිහට Login වෙන එක වැඩ කරනවා, ඒ මොකද කිව්වොත් මේක Client Side එකේ තියෙන එකක් නමුත් Login වෙන Server Side එකට 
                        // යන්න ඕන නේ ඒ නිසා තමයි මේක Form එකක් විදිහට දාලා "use server" කියන එක පාවිච්චි කරලා තියෙන්නේ.
                        <form
                            action={async () => {
                                "use server";
                                // මෙතනදි SignIn කියන එක Auth Js වලින් ආපු එකක් සහ Github කියලා තියෙන්නේ අපි Sign In වෙන්න පාවිච්චි කරන Service Provider.
                                await signIn("github");
                            }}
                        >
                            {/*  Form එක Submit කරන්නෙ මෙතනින් */}
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar