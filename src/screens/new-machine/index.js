import React, {useEffect, useRef, useState} from 'react'
import dataRequests from "../../services/http/data"
import NewMachinePart from "./part"
import NewMachineDefaultSlot from "./default-slot"
import NewMachineRamSlot from "./ram-slot"
import machineRequests from "../../services/http/machine"
import {useNavigate} from "react-router"

const NewMachineScreen = () => {
    const [category, setCategory] = useState('motherboards');
    const [categoryLoading, setCategoryLoading] = useState(true);

    const [motherboard, setMotherboard] = useState(null);
    const [ramMemory, setRamMemory] = useState(null);
    const [ramMemoryAmount, setRamMemoryAmount] = useState(1);
    const [processor, setProcessor] = useState(null);
    const [storageDevice, setStorageDevice] = useState(null);
    const [storageDeviceAmount, setStorageDeviceAmount] = useState(1);
    const [graphicCard, setGraphicCard] = useState(null);
    const [graphicCardAmount, setGraphicCardAmount] = useState(1);
    const [powerSupply, setPowerSupply] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [parts, setParts] = useState([]);

    const photoFileRef = useRef(null);

    const navigate = useNavigate();

    const onChangeCategory = (ev) => {
        setCategory(ev.target.value);
    };

    const loadCategory = async () => {
        setCategoryLoading(true);

        try {
            const response = await dataRequests.getList(category);
            setParts(response.data);
        }  catch(e) {
            console.error(e);
        } finally {
            setCategoryLoading(false);
        }
    };

    useEffect(() => {
        loadCategory();
    }, [category]);

    const validate = async (state) => {
        if(state.motherboard === null || state.powerSupply === null) {
            return false;
        }

        const data = {
            motherboardId: state.motherboard.id,
            powerSupplyId: state.powerSupply.id,
        };

        if(state.processor) {
            data.processorId = state.processor.id;
        }

        if(state.ramMemory) {
            data.memoryId = state.ramMemory.id;
            data.memoryAmount = state.ramMemoryAmount;
        }

        if(state.graphicCard) {
            data.graphicCardId = state.graphicCard.id;
            data.graphicCardAmount = state.graphicCardAmount;
        }

        return machineRequests.validate(data);
    };

    const deleteMotherboard = () => {
        setMotherboard(null);
        setProcessor(null);
        setRamMemory(null);
        setRamMemoryAmount(1);
        setPowerSupply(null);
        setStorageDevice(null);
        setStorageDeviceAmount(1);
        setGraphicCard(null);
        setGraphicCardAmount(1);
    };

    const onSelectMotherboard = async (p) => {
        try {
            await validate({
                motherboard: p,
                processor,
                ramMemory,
                ramMemoryAmount,
                powerSupply,
                storageDevices: storageDevice ? [{ id: storageDevice.id, amount: storageDeviceAmount }] : [],
                graphicCard,
                graphicCardAmount,
            });

            setMotherboard(() => p);
            return true;
        } catch(e) {
            return false;
        }
    };

    const onSelectProcessor = async (p) => {
        try {
            await validate({
                motherboard,
                processor: p,
                ramMemory,
                ramMemoryAmount,
                powerSupply,
                storageDevices: storageDevice ? [{ id: storageDevice.id, amount: storageDeviceAmount }] : [],
                graphicCard,
                graphicCardAmount,
            });

            setProcessor(() => p);
            return true;
        } catch(e) {
            return false;
        }
    };

    const onSelectRamMemory = async (p) => {
        try {
            await validate({
                motherboard,
                processor,
                ramMemory: p,
                ramMemoryAmount,
                powerSupply,
                storageDevices: storageDevice ? [{ id: storageDevice.id, amount: storageDeviceAmount }] : [],
                graphicCard,
                graphicCardAmount,
            });

            setRamMemory(() => p);
            return true;
        } catch(e) {
            return false;
        }
    };

    const onChangeRamMemoryAmount = async (ev) => {
        setRamMemoryAmount(ev.target.value);

    };
    const onChangeGraphicCardAmount = async (ev) => {
        setGraphicCardAmount(ev.target.value);
    };

    const onChangeStorageDeviceAmount = async (ev) => {
        setStorageDeviceAmount(ev.target.value);
    };

    const onSelectGraphicCard = async (p) => {

        try {
            await validate({
                motherboard,
                processor,
                ramMemory,
                ramMemoryAmount,
                powerSupply,
                storageDevices: storageDevice ? [{ id: storageDevice.id, amount: storageDeviceAmount }] : [],
                graphicCard: p,
                graphicCardAmount,
            });

            setGraphicCard(() => p);
            return true;
        } catch(e) {
            return false;
        }
    };

    const onSelectStorageDevice = async (p) => {

        try {
            await validate({
                motherboard,
                processor,
                ramMemory,
                ramMemoryAmount,
                powerSupply,
                storageDevices: [{ id: p.id, amount: storageDeviceAmount }],
                graphicCard,
                graphicCardAmount,
            });

            setStorageDevice(() => p);
            return true;
        } catch(e) {
            return false;
        }
    };

    const onSelectPowerSupply = async (p) => {
        try {
            await validate({
                motherboard,
                processor,
                ramMemory,
                ramMemoryAmount,
                powerSupply: p,
                storageDevices: storageDevice ? [{ id: storageDevice.id, amount: storageDeviceAmount }] : [],
                graphicCard,
                graphicCardAmount,
            });

            setPowerSupply(() => p);
            return true;
        } catch(e) {
            return false;
        }
    };

    const onSave = async () => {
        const photoBase64 = await (function() {
           return new Promise((resolve) => {
               let reader = new FileReader();
               reader.readAsDataURL(photoFileRef.current.files[0]);
               reader.onload = function () {
                   resolve(reader.result);
               };
               reader.onerror = function (error) {
                   console.log('Error: ', error);
               };
           });
        }());

        const data = {
            motherboardId: motherboard.id,
            powerSupplyId: powerSupply.id,
        };

        if(processor) {
            data.processorId = processor.id;
        }

        if(ramMemory) {
            data.memoryId = ramMemory.id;
            data.memoryAmount = ramMemoryAmount;
        }

        if(graphicCard) {
            data.graphicCardId = graphicCard.id;
            data.graphicCardAmount = graphicCardAmount;
        }

        data.name = name;
        data.description = description;
        data.imageBase64 = photoBase64;

        try {
            await machineRequests.create(data);
            navigate('/');
        } catch(e) {
            alert('Something went wrong');
            console.error(e);
        }
    };

    return (
        <section className={'new-machine'}>
            <div className="container">
                <div className="new-machine__header">
                    <b>Create new machine</b>
                </div>

                <div className="new-machine__content">
                    <div className="new-machine__parts">
                        <div className="new-machine__parts-header">
                            <b>Parts</b>

                            <div className="new-machine__parts-select">
                                <select value={category} disabled={categoryLoading}
                                        onChange={onChangeCategory}>
                                    <option value={'motherboards'}>Motherboards</option>
                                    <option value={'processors'}>Processors</option>
                                    <option value={'ram-memories'}>RAM Memory</option>
                                    <option value={'storage-devices'}>Storage Devices</option>
                                    <option value={'graphic-cards'}>Graphic Cards</option>
                                    <option value={'power-supplies'}>Power Supplies</option>
                                </select>
                            </div>
                        </div>

                        <div className="new-machine__parts-list">
                            {categoryLoading ? (
                                <div className={'new-machine__parts-loading'}>
                                    Loading...
                                </div>
                            ) : parts.map((part) => {
                                return (
                                    <NewMachinePart part={part} activeCategory={category} key={`part-${part.id}`} />
                                );
                            })}
                        </div>
                    </div>

                    <div className="new-machine__configuration">
                        <NewMachineDefaultSlot title={'Motherboard'}
                                               category={'motherboards'}
                                               activeCategory={category}
                                               part={motherboard}
                                               onSelect={onSelectMotherboard}
                                               onDelete={deleteMotherboard}/>


                        <NewMachineDefaultSlot title={'Power Supply'}
                                               category={'power-supplies'}
                                               activeCategory={category}
                                               part={powerSupply}
                                               disabled={!motherboard}
                                               onSelect={onSelectPowerSupply}
                                               onDelete={() => setPowerSupply(null)} />

                        <NewMachineDefaultSlot title={'Processor'}
                                               category={'processors'}
                                               activeCategory={category}
                                               part={processor}
                                               disabled={!motherboard}
                                               onSelect={onSelectProcessor}
                                               onDelete={() => setProcessor(null)} />


                        <NewMachineRamSlot title={'RAM Memory'}
                                           category={'ram-memories'}
                                           activeCategory={category}
                                           part={ramMemory}
                                           amount={ramMemoryAmount}
                                           disabled={!motherboard}
                                           onSelect={onSelectRamMemory}
                                           onChangeAmount={onChangeRamMemoryAmount}
                                           onDelete={() => {
                                               setRamMemory(null);
                                               setRamMemoryAmount(1);
                                           }} />

                        <NewMachineRamSlot title={'Graphic Card'}
                                               category={'graphic-cards'}
                                               activeCategory={category}
                                               part={graphicCard}
                                               amount={graphicCardAmount}
                                               disabled={!motherboard}
                                               onSelect={onSelectGraphicCard}
                                               onChangeAmount={onChangeGraphicCardAmount}
                                               onDelete={() => {
                                                   setGraphicCard(null);
                                                   setGraphicCardAmount(1);
                                               }}/>

                        <NewMachineRamSlot title={'Storage Device'}
                                           category={'storage-devices'}
                                           activeCategory={category}
                                           part={storageDevice}
                                           amount={storageDeviceAmount}
                                           disabled={!motherboard}
                                           onSelect={onSelectStorageDevice}
                                           onChangeAmount={onChangeStorageDeviceAmount}
                                           onDelete={() => {
                                               setStorageDevice(null);
                                               setStorageDeviceAmount(1);
                                           }}/>
                    </div>
                </div>

                <div className="new-machine__footer">
                    <div className="new-machine__footer-field">
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)}/>
                    </div>

                    <div className="new-machine__footer-field">
                        <label htmlFor="">Description</label>
                        <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />
                    </div>

                    <div className="new-machine__footer-file">
                        <label htmlFor="">Select photo</label>
                        <input type="file" ref={photoFileRef}/>
                    </div>

                    <button type={'button'} disabled={name.length === 0 || description.length === 0} onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </section>
    )
};

export default NewMachineScreen;
