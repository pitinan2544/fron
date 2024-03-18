import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const guestNav = [
    { to: '/', text: 'เข้าสู่ระบบ' },
    { to: '/register', text: 'สมัครสมาขิก' },
];

const userNav = [
    { to: '/', text: 'หน้าหลัก' },
    { to: '/member', text: 'รายชื่อสมาชิก' },
    { to: '/createMember', text: 'เพิ่มสมาชิก' },
    { to: '/record', text: 'เพิ่มเงินฝากเงินกู้' },
    { to: '/recordAll', text: 'ประวัติการทำรายการ' },
];

export default function Header() {
    const { user, logout } = useAuth();
    const finalNav = user?.id ? userNav : guestNav;

    const navigate = useNavigate();

    const hdlLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar bg-gradient-to-r from-blue-400 to-blue-700 text-white">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl"> Hello, {user?.id ? user.username : 'Guest'} </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {finalNav.map((el) => (
                        <li key={el.to}>
                            <Link to={el.to}>{el.text}</Link>
                        </li>
                    ))}
                    {user?.id && (
                        <li>
                            <Link to="#" onClick={hdlLogout}>
                                ออกจากระบบ
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
