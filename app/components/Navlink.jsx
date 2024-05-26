import Link from "next/link"

const Navlink = ({ href, title }) => {
    return (
        <Link
            href={`/${title}`}
            className='block py-2 pl-3 pr-4 text-[#adb7be] sm:text-xl rounded md:p-0 hover:text-white'>{title}</Link>
    )
}

export default Navlink;