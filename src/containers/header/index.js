import {useCallback, useContext} from "react";
import AppContext from "../../contexts/app.context";
import Button from "../../components/button"
import styles from './index.module.css'
import {useNavigate} from "react-router"
import userRequests from "../../services/http/user"

const Header = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        (async function() {
            try {
                await userRequests.logout();
                context.logout();
                navigate("/");
            } catch(e) {
                console.error(e);
            }
        }());
    }, [navigate, context.logout]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <a href={'/'} className={styles.leftText}>Alatech</a>
                </div>

                {context.authorized && (
                    <div className={styles.right}>
                        <Button variant={'danger'}
                                text={'Logout'}
                                onClick={logout} />
                    </div>
                )}
            </div>
        </div>
    )
};

export default Header;
