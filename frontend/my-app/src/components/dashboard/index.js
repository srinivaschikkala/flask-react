import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './index.css'
function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    
    function GetData(){
        axios.get('http://localhost:5000/api/employees')
        .then(response => {
            setEmployees(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching the employees:', error);
        });
    }
    useEffect(GetData,[])
    return (
        <div >
            <h1>Employee List</h1>
            <div className='container' >
            <table className='table_body' border="2" cellPadding="10" >
                <thead>
                    <tr>
                        <th>Employee Number</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Extension</th>
                        <th>Email</th>
                        <th>Office Code</th>
                        <th>Job Title</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Reports To</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.employeeNumber}>
                            <td>{employee.employeeNumber}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.extension}</td>
                            <td>{employee.email}</td>
                            <td>{employee.officeCode}</td>
                            <td>{employee.jobTitle}</td>
                            <td>{employee.city}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.reportsTo ? `${employee.reportToFirstName} ${employee.reportToLastName}` : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}
    
export default EmployeeTable;