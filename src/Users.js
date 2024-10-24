import Nav from './Nav';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import axios from 'axios';

const Home = () => {

    const user = localStorage.getItem("employee");
    const tenantname = localStorage.getItem("tenant_name");
    const[firstname, setFirstname] = useState("");
    const[secondname, setSecondname] = useState("");
    const[membershipNo, setMembershipNo] = useState("");
    const[residency, setResidency] = useState("");
    const[nationalID, setNationalID] = useState("");
    const[phone, setPhone] = useState("");
    const[members, setMembers] = useState([]);
    const[tenants, setTenants] = useState([]);
    const[roles, setRoles] = useState([]);
    const[assignedRoles, setAssignedRoles] = useState([]);
    const[tenant, setTenant] = useState("");

    const hideMemberRegistration = () => {
        document.getElementById("registermember").style.visibility = 'hidden';
    };
    const registerMember = () => {
        document.getElementById("registermember").style.visibility = 'visible';
    }

    const onFirstnameChange = (e) => {
        setFirstname(e.target.value);
    };

    const onSecondnameCHange = (e) => {
        setSecondname(e.target.value);
    };

    const onMembershipChange = (e) => {
        setMembershipNo(e.target.value);
    };

    const onResidencyChange = (e) => {
        setResidency(e.target.value);
    };

    const onNationalIDChange = (e) => {
        setNationalID(e.target.value);
    };

    const onPhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const init = () => {
        setPhone("");
        setNationalID("");
        setResidency("");
        setMembershipNo("");
        setSecondname("");
        setFirstname("");
        setAssignedRoles([]);
        setTenant("");


    };
    const setRole = (tag) => {
        setAssignedRoles(state => [...state, tag]);
        setRoles(roles.filter(item => item.value !== tag.value));
    }
    const removeRole = (idx) => {
        setRoles(state => [...state, idx]);
        setAssignedRoles(assignedRoles.filter(item => item.value !== idx.value));
    }
    useEffect(() => {
        loadMemberInformation();
        loadTenantInformation();
    }, []);
    const loadMemberInformation = () => {
        axios.get("/api/v1/member/" + "")
                .then((response) => {
                    setMembers(response.data);
                }).catch((err) => {
        });
    };
    const loadTenantInformation = async () => {
        await axios.get("/api/v1/tenant/")
                .then((response) => {
                    setTenants(response.data);
                }).catch((err) => {
        });
        await axios.get("/api/v1/employee/permissions")
                .then((response) => {
                    setRoles(response.data);
                }).catch((err) => {
        });
    };
    const submit = (event) => {
        event.preventDefault();
        var employee = {address: residency, firstName: firstname, secondName: secondname, id: membershipNo, phone: phone, identityNo: nationalID, employeeRoles: assignedRoles, loginAccess: "7924"}
        axios.post("/api/v1/employee/" + tenant, employee)
                .then((response) => {
                    init();
                    //loadMemberInformation();
                    swal("", "", "success");

                }).catch((err) => {
                    const message=err.response.data.message;
                
                     swal("", message," failed");
                
        });
    }
    const selectTenant = (e) => {
        setTenant(e.target.value);

    }



    return(
            <div class="relative">
                <Nav/>
                <div class="absolutfe hidden center-left bg-teal padding-md pointer border-right-rad-md text-white">
                    <span class="material-symbols-outlined">chevron_right</span> 
                </div>
            
                <div class="content-box relative">
            
                    <span class="text-white font-sm"></span>
                    <div class="right-top-2 hidden absolute text-white bg-orange padding-sm font-sm pointer">{tenantname} {user} {moment().format("MMMM DD YYYY ")}</div>
            
                    <div class="  padding-md  absolute hiddens absoluted h-55"  id="registerUser">
                        
            
                            <div class="padding-md border-2 margin-sm">
            
                                <form class=" text-white font-sm relatived  w-20d padding-mdd " onSubmit={submit}>
            
                                    <div class="flex-horizontal">
                                        <div class="flex-vertical margin-sm">
                                            First name
                                            <input required type="text" class="border-3 bg-gray  text-white padding-md w-9ds0 margin-mdd" value={firstname} onChange={onFirstnameChange}/>
                                        </div>
                                        <div class="flex-vertical margin-sm">
                                            Second Name
                                            <input required type="text" class="border-3 bg-gray border-rad-sdm padding-md text-white w-9d0 margin-mdd"value={secondname} onChange={onSecondnameCHange}/>
                                        </div>
                                        <div class="flex-vertical margin-sm">
                                            Membership No.
                                            <input required type="text" class="border-3 bg-gray border-rad-sdm padding-md w-9d0 text-white margin-mdd" value={membershipNo} onChange={onMembershipChange}/>
                                        </div>
                                        <div class="flex-vertical margin-sm">
                                            Residency
                                            <input required type="text" class="border-3 bg-gray border-rad-sdm padding-md w-9d0 text-white margin-mdd" value={residency} onChange={onResidencyChange}/>
                                        </div>
                                        <div class="flex-vertical margin-sm">
                                            National Id No.
                                            <input required type="text" class="border-3 bg-gray border-rad-sdm padding-md w-9d0 text-white margin-mdd"value={nationalID} onChange={onNationalIDChange}/>
                                        </div>
                                        <div class="flex-vertical margin-sm">
                                            Phone No.
                                            <input required type="text" class="border-3 bg-gray border-rad-sdm padding-md w-9d0 text-white margin-mdd" value={phone} onChange={onPhoneChange}/>
                                        </div>
                                    </div>
                                    <button type="submit" class="  bg-green border-none text-white padding-md border-rad-sm pointer absolute bottom-right">Register</button>
                                </form>
                            </div>
            
                            <div class="padding-md border-2 border-3"> 
                                <span class="bg-light-green pointer font-sm padding-sm margin-sm text-white">Tenants</span>
                                <p class="font-sm text-white">Select a tenant</p>
                                <select onChange={selectTenant} class="padding-sm bg-gray text-white border-none">
                                    {tenants.map(tenant => <option value={tenant.id}>{tenant.name}</option>)}
                                </select>
                            </div>
                            <div class="padding-md w-450d margin-mdd border-2"> 
                                <span class="bg-light-green pointer font-sm padding-sm margin-sm text-white">Permissions</span>
                                <p class="font-sm text-white">Select roles</p>
                                <div class="flex-horizontal">
                                    {roles.map(role => <span class="font-sm bg-gray border-rad-sm margin-sm padding-sm pointer center text-white" onClick={() => setRole(role)}>{role.value} <span class="material-symbols-outlined font-l">add</span></span>)}
                                </div>
                                <div class="flex-horizontal">
                                    {assignedRoles.map(role => <span class="font-sm bg-green margin-sm padding-sm center-text center pointer border-rad-sm text-white" onClick={() => removeRole(role)}>{role.value} <span class="material-symbols-outlined font-l">cancel</span></span>)}
                                </div>     
                            </div>
                            
                    </div>
            
            
                </div>
            
            </div>
            );



}
;
export default Home;
