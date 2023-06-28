import React, {useCallback, useContext, useState} from 'react'
import styles from './index.module.css'
import Input from "../../components/input"
import Button from "../../components/button"
import userRequests from "../../services/http/user"
import AppContext from "../../contexts/app.context"

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const context = useContext(AppContext);

    const onChangeUsername = useCallback((ev) => {
        setUsername(ev.target.value);
    }, [setUsername]);

    const onChangePassword = useCallback((ev) => {
        setPassword(ev.target.value);
    }, [setPassword]);

    const submitForm = useCallback(async () => {
        try {
            setLoading(true);
            const response = await userRequests.login(username, password);

            context.login(response.data.token);
        } catch(e) {
            console.error(e);

            if(typeof e.response !== "undefined") {
                context.showErrorModal("Error occurred when login", e.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }, [setLoading, context, username, password]);

    return (
        <section className={styles.root}>
            <div className={styles.sectionContainer}>
                <div className={styles.header}>
                    <h3 className={styles.headerTitle}>Welcome back!</h3>
                    <p className={styles.headerText}>Please log in by input your username and password</p>
                </div>

                <div className={styles.form}>
                    <form onSubmit={submitForm}>
                        <div className={styles.formInput}>
                            <Input label={"Username"} value={username}
                                   id={"username"}
                                   onChange={onChangeUsername}/>
                        </div>

                        <div className={styles.formInput}>
                            <Input label={"Password"} value={password}
                                   id={"password"}
                                   onChange={onChangePassword}/>
                        </div>

                        <div className={styles.formButton}>
                            <Button variant={"success"} text={"Login"}
                                    type={'submit'}
                                    disabled={loading}
                                    onClick={submitForm} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginScreen;
