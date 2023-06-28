import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styles from './index.module.css'
import Button from "../../components/button"
import TabsButton from "../../components/tabs-button"
import {useNavigate} from "react-router"
import dataRequests from "../../services/http/data"
import EntityCard from "../../components/entity-card"

const TABS = [
    ['machines', 'Machines'],
    ['motherboards', 'Motherboards'],
    ['power-supplies', 'Power supplies'],
    ['processors', 'Processors'],
    ['ram-memories', 'RAM Memory'],
    ['graphic-cards', 'Graphic cards'],
    ['storage-devices', 'Storage devices'],
]

const HomeScreen = () => {
    const [tab, setTab] = useState(TABS[0][0]);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const goToNewMachine = useCallback(() => {
        navigate("/new-machine")
    }, [navigate]);

    const onChangeTab = useCallback((key) => {
        setTab(key);
    }, [setTab]);

    const renderedTabs = useMemo(() => {
        return TABS.map((v) => (
            <TabsButton text={v[1]}
                        id={v[0]}
                        active={tab === v[0]}
                        onClick={onChangeTab} />
        ));
    }, [tab, onChangeTab]);

    const renderedEntities = useMemo(() => {
        return entities.map((v) => {
            return (
                <EntityCard imageURL={v.imageUrl}
                            name={v.name} key={v.name} />
            )
        });
    }, [tab, entities]);

    useEffect(() => {
        setLoading(true);

        (async function() {
            const response = await dataRequests.getList(tab);
            setEntities(response.data);
            setLoading(false);
        }());
    }, [tab]);

    return (
        <section className={styles.root}>
            <div className={styles.sectionContainer}>
                <nav className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.headerLeftText}>Home</h1>
                        <p className={styles.headerLeftDescription}>List of all parts, available on our website</p>
                    </div>

                    {tab === "machines" && (
                        <div className={styles.headerRight}>
                            <Button variant={'success'}
                                    text={"Create new machine"}
                                    onClick={goToNewMachine} />
                        </div>
                    )}
                </nav>

                <div className={styles.filter}>
                    <div className={styles.filterButtons}>
                        {renderedTabs}
                    </div>
                </div>

                {!loading ? (
                    <div className={styles.list}>
                        {renderedEntities}
                    </div>
                ) : (
                    <div className={styles.loading}>
                        Loading...
                    </div>
                )}
            </div>
        </section>
    )
};

export default HomeScreen;
