import Nav from './Nav';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import MonthlyChart from './MonthlyChart';
import { Bars } from 'react-loader-spinner';
import {Loaderspinner } from 'react-loader-spinner';

const Home = () => {
    const[name, setName] = useState(null);
    const[phone, setPhone] = useState(null);
    const[email, setEmail] = useState(null);
    const[location, setLocation] = useState(null);
    const[tenant, setTenant] = useState([]);
    const[main, setMain] = useState(true);
    const[postLogs, setPostLogs] = useState([]);
    const[graph, setGraph] = useState([]);
    const[paths, setPaths] = useState([]);
    const[loading, setLoading] = useState(false);
    const[status, setStatus] = useState([]);
    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onPhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const init = () => {
        setName("");
        setPhone("");
        setEmail("");
        setLocation("");
    };
    const loadTenantInformation = async () => {
        await axios.get("/api/v1/tenant/")
                .then((response) => {
                    setTenant(response.data);
                }).catch((err) => {
        });
    };
    const loadPostLogs = () => {
        setLoading(true);
        axios.get("/api/v1/logging/post")
                .then((response) => {
                    setPostLogs("");
                    var data = response.data.table;
                    setGraph(response.data.graph);
                    setPostLogs(data);
                    setPaths(response.data.paths);
                    setStatus(response.data.httpStatus);
                    //setPostLogs((JSON.parse('[{name:tom},{name:samuel}]')));
                    setLoading(false);


                }).catch((err) => {
        });

    };
    useEffect(() => {
        loadTenantInformation();
        loadPostLogs();
        //console.log(JSON.parse('{"uri":"POST /api/v1/records/y553A9k3YMd9sxdxbUfNmxPCRO9bApHlFezPoWTc1PuOZJ4H9M4KdDVtOE4JyM6bWBQDccNLrZmg8RjxFGMV523I37BQwgbRjppCCSEKqbC6ZvvCQeODDJBLJUfB4p8tYhQYxyTaYpxtq3Nqhf4vwvm51hIWWMQDwNG26FQJxRXwQQKxoN75jK4efYVV0MghsZGU1D5DgXl6Qz34ke26hp0mfc4DKDFYAdmbn3rIg5U7CPxebnv8Yr87CFbtWOr/1 HTTP/1.1","status":"202","bytes":"231","time": "732","requestbody":{"amount":"3","date":"2024-04-06"}} {"uri":"POST /api/v1/records/y553A9k3YMd9sxdxbUfNmxPCRO9bApHlFezPoWTc1PuOZJ4H9M4KdDVtOE4JyM6bWBQDccNLrZmg8RjxFGMV523I37BQwgbRjppCCSEKqbC6ZvvCQeODDJBLJUfB4p8tYhQYxyTaYpxtq3Nqhf4vwvm51hIWWMQDwNG26FQJxRXwQQKxoN75jK4efYVV0MghsZGU1D5DgXl6Qz34ke26hp0mfc4DKDFYAdmbn3rIg5U7CPxebnv8Yr87CFbtWOr/1 HTTP/1.1","status":"202","bytes":"231","time": "732","requestbody":{"amount":"3","date":"2024-04-06"}}'));
        //const interval = setInterval(() => {
        //loadPostLogs();
        //}, 60000);
        //return () => clearInterval(interval);

    }, []);

    const user = localStorage.getItem("employee");
    const tenantname = localStorage.getItem("tenant_name");
    const submit = (e) => {
        e.preventDefault();
        var tenant = {name: name, phone: phone, email: email, location: location};
        axios.post("/api/v1/tenant/", tenant)
                .then((response) => {
                    init();
                    loadTenantInformation();
                    hideTenantRegistration();
                    swal("", "", "success");

                }).catch((err) => {
        });

    }
    const showTenantRegistration = () => {
        document.getElementById("TenantRegistration").style.display = "block";
        if (main === true) {
            document.getElementById("tenantRegistrationButton").style.display = "none";
            document.getElementById("tenantRegistrationBanner").style.position = "absolute";
            document.getElementById("tenantRegistrationBanner").style.left = "20px";
            document.getElementById("tenantRegistrationBanner").style.color = "red";
        } else {

        }
    }

    const showTenantRegistration2 = () => {
        setMain(false);
        document.getElementById("TenantRegistration").style.display = "block";

    }
    const hideTenantRegistration = () => {
        document.getElementById("TenantRegistration").style.display = "none";
        document.getElementById("tenantRegistrationButton").style.display = "block";
        if (main) {
            document.getElementById("tenantRegistrationBanner").style.position = "absolute";
            document.getElementById("tenantRegistrationBanner").style.left = "20px";
            document.getElementById("tenantRegistrationBanner").style.color = "red";
        }
    }
    const filter = (e) => {
        e.preventDefault();
        hideLogFilter();
        setLoading(true);
        axios.get("/api/v1/logging/post?" + searchParams.toString())
                .then((response) => {
                    setPostLogs("");
                    var data = response.data.table;
                    setGraph(response.data.graph);
                    setPostLogs(data);
                    //setPaths(response.data.paths);
                    //setPostLogs((JSON.parse('[{name:tom},{name:samuel}]')));

                    setLoading(false);

                }).catch((err) => {
        });

    }

    const searchParams = new URLSearchParams();

    const onPathChange = (e) => {
        searchParams.append("path", e.target.value);


    }
    const onMethodChange = (e) => {
        searchParams.append("method", e.target.value);

    }
    const onTenantChange = (e) => {
        searchParams.append("tenant", e.target.value);
    }

    const onStatusChange = (e) => {
        searchParams.append("status", e.target.value);
    }

    const restoreData = () => {
    }
    const hideLogFilter = () => {
        document.getElementById("logFilter").style.visibility = "hidden";
    }
    const showLogFilter = () => {
        document.getElementById("logFilter").style.visibility = "visible";
    }
    return(
            <div class="relative">
                <Nav/>
            <div id="logFilter" class="c content-box z-index-high relatives">
                <form onSubmit={filter} class=" bg-red  relatived "> 
                
                    <div   class="border-rad-dsm  w-d250 hidden centerpage padding-md z-index-high fixed absoluted flex-vertical margin-md left-0d bg-white fh-55">
                        <div class="top-right absolute bg-orange padding-sm border-rad-smd pointer text-white" onClick={hideLogFilter}><span class="material-symbols-outlined font-md font-bold">close</span></div>
                        <span class="absolute font-xsm  bg-green padding-sm margin-md text-white right-0 hidden">Settings</span>                        
                        <div class="flex-vertical margin-md font-xsm">
                            <span class=" font-bold">Paths</span>
                            <fieldset onChange={onPathChange}>
                                {paths.map(p => <div class="padding-sm"><input type="checkbox" value={p} name="path"/>{p}</div>)}
                            </fieldset>                            
                        </div>                        
                        <div class="flex-vertical">                       
            
            
                            <div class="font-xsm margin-md flex-vertical"><span class="font-bold">HTTP METHODS</span>
                                <div class="flex-horizotald display-flex">
                                    <fieldset onChange={onMethodChange} class="border-1">
                                        <div class=" padding-sm"> <input type="checkbox" value="POST" name="method"/> POST</div>
                                        <div class=" padding-sm"> <input type="checkbox" value="GET" name="method"/> GET</div>
                                        <div class="padding-sm"> <input type="checkbox" name="method" value="PUT"/> PUT</div>
                                        <div class="padding-sm"> <input type="checkbox" name="method" value="PATCH"/> PATCH</div>
                                        <div class="padding-sm"> <input type="checkbox"name="method" value="DELETE"/> DELETE</div>
                                    </fieldset>
                                </div>                        
                            </div> 
            
            
                        </div>
            
                        <div class=" font-xsm margin-md display-flex">
                            <span class="font-bold margin-md">TENANTS</span>
                            <fieldset onChange={onTenantChange}>
                                {tenant.map(p => <div class="padding-sm"><input type="checkbox" value={p.name} name="tenant"/>{p.name}</div>)}
                            </fieldset>
                            <div class="flex-horizontal bg-black border-rad-sm">
            
                            </div></div>
            
                        <div class=" font-xsm margin-md display-flex">
                            <span class="font-bold margin-md">HTTP STATUS</span>
                            <fieldset onChange={onStatusChange}>
                                {status.map(p => <div class="padding-sm"><input type="checkbox" value={p} name="tenant"/>{p}</div>)}
                            </fieldset>
                            <div class="flex-horizontal bg-black border-rad-sm">
                                <select>
                                <option>00</option>
                                </select>
                            </div></div>
                        <div class="absolute flex-horizontal bottom-right">
                            <button class="bg-red border-none margin-sm" onClick={restoreData}>Restore</button>
                            <input class="absolutes bottom-rights padding-md bg-green border-none pointer center text-white border-rad-smf" type="submit" value="search"/>
                        </div>                        
                    </div>
                    
                </form></div>
                <div class="absolutfe hidden center-left bg-teal padding-md pointer border-right-rad-md text-white">
                    <span class="material-symbols-outlined">chevron_right</span> 
                </div>
            
                <div class="content-box relative overflow-scroll">
                    <div class="absolute centerspinner relatived fixed z-index-high centerpagej">   
                        <div class="centerspinner">
                            <Bars
                                height="100"
                                width="100"
                                color="#A9BF4E"
                                ariaLabel="rotating-square-loading"
                                strokeWidth="4"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={loading}
                                /></div></div>
                    <span class="text-white Mulish absolute  padding-md bg-gray">TNNT</span>
                    <span class="text-white font-sm"></span>
            
                    <div> {tenant ? <div class="text-white flex-horizontal fixedd center font-xsm padding-md   margin-sm"> <button class="bg-gray border-1 padding-sm width-2d0 absoluted squared right-d0 border-rad-sm pointer text-white" onClick={showTenantRegistration2} id="tenantRegistrationButton">+</button> {tenant.map(t => <div class=" center squared border-1 pointer overflow-none bg-green padding-sm margin-sm">{t.name}</div>)}</div> :
                            <div class="text-white flex-vertical centerpage text-md  text-center" ><div id="tenantRegistrationBanner">
                                    No tenant {user}!<button class="bg-green border-none padding-sm width-20 border-rad-sm pointer text-white" onClick={showTenantRegistration} id="tenantRegistrationButton">new</button>
                                </div>  </div>}</div>
                    <div class="right-top-2d  absolute hidden text-white bg-orange padding-sm font-sm pointer">{tenantname} {user} {moment().format("MMMM DD YYYY ")}</div>  
                    <div class=" w-250 padding-md h-55f bg-white hidden absolute z-index-high right-0 float-centerg center-vertical"  id="TenantRegistration">
                        <div class=" h-55d relative  bg-white  left-m ">
                            <div>
            
            
                                <form class=" text-gray font-sm relative w-250" onSubmit={submit}>
                                    <div class="top-right absolute bg-orange padding-sm border-rad-md pointer text-white" onClick={hideTenantRegistration}><span class="material-symbols-outlined font-md font-bold">close</span></div>
                                    <div class="flex-vertical">
                                        <div class="flex-vertical padding-md">
                                            Name
                                            <input required type="text" class="border-1 border-rad-sm  padding-md w-9d0 margin-sm" value={name} onChange={onNameChange}/>
                                        </div>
                                        <div class="flex-vertical padding-md">
                                            Phone
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-sm"value={phone} onChange={onPhoneChange}/>
                                        </div>
                                        <div class="flex-vertical padding-md">
                                            Email
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-sm" value={email} onChange={onEmailChange}/>
                                        </div>
                                        <div class="flex-vertical padding-md">
                                            Location
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-sm" value={location} onChange={onLocationChange}/>
                                        </div>
                                    </div>
                                    <div class="padding-md">
                                        <button type="submit" class="padding-sm border-rad-sm border-none menu-itemf bg-orange text-white pointer ">Register</button>
                                    </div>
                                </form>
                            </div>
            
                        </div>
                    </div> 
                    <div class="relatives absolute z-index-high" >
                        <button onClick={showLogFilter} class="bg-light-green font-sm border-none text-white pointer absolufte margin-sm padding-sm bg">Filter </button>
            
                    </div>
                    {loading ? <></> : <div>
                        <div class=""><MonthlyChart data={graph}/></div>
                        {postLogs.length}
                        <table class="table padding-sm margin-sm  "> <tr class="font-sm text-white"><th>Count</th><th>Method</th><th>Path</th><th>Tenant</th><th>Date</th><th>Time</th>   <th>Message</th><th>Payload</th> <th>Status</th> </tr>
                            {postLogs.map((log, k) => <tr class="font-xsm pointer border-rad-md padding-md">
                                <td class="align-left padding-sm">{postLogs.length - k}</td>
                                <td>{log.method}</td>
                                <td>{log.path}</td>
                                <td>{log.tenant}</td>
                                <td class="align-left">{log.date[0]}-{log.date[1]}-{log.date[2]} {log.date[3]}:{log.date[4]}:{log.date[5]}</td>
                                <td class="align-left">{log.time}ms<span class="note absolute right-0d bg-yellow"></span></td>
                                <td class="align-left">{log.uri.substring(0, 100) + "..."}</td>
                                <td>{JSON.stringify(log.requestbody, 4).substring(0, 20)}</td>
                                <td>{log.status}</td>
                                <td></td>
                            </tr>)}
                        </table></div>}
                </div>
            </div>
            );



}
;
export default Home;
