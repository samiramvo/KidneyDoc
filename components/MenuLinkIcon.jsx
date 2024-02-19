import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLinkIcon = ({ item, mode }) => {
    const pathname = usePathname();

    return (
        <Link href={item.path} className={`containerlink ${pathname === item.path ? 'active' : ''}`}>
            {mode === "normal" && <span className="text-2xl">{item.icon}</span>}
        </Link>
    );
};

export default MenuLinkIcon;