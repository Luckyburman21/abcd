import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CommonHeader from './common/header';
import Sidebar from './common/Sidebar';
import BudgetRequest from "./components/RevenueManagement/BudgetRequest";
import AddNewBudgetRequest from "./components/RevenueManagement/AddNewBudgetRequest";
import BudgetProjection from './components/RevenueManagement/BudgetProjection';
import AddNewBudgetProjection from './components/RevenueManagement/AddNewBudgetProjection';
import BudgetSurrender from "./components/RevenueManagement/BudgetSurrender";
import AddNewBudgetSurrender from "./components/RevenueManagement/AddNewBudgetSurrender";
import BudgetAllotment from "./components/RevenueManagement/BudgetAllotment";
import AddNewBudgetAllotment from "./components/RevenueManagement/AddNewBudgetAllotment";
import ExpenditureMonitoring from './components/RevenueManagement/ExpenditureMonitoring';
import BudgetWithdrawal from './components/RevenueManagement/BudgetWithdrawal ';
import RequestRecommendation from './components/RequestRecommendation/RequestRecommendation';
import ProcessRecommendation from './components/ProcessRecommendation/ProcessRecommendation';
import PaymentForm from './components/RevenueManagement/PaymentForm';

import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BudgetWithdrawalForm from './components/RevenueManagement/BudgetWithdrawal ';
import RevenueReport from './components/RevenueReports/RevenueReport';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        alert('Logged out');
    };

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    }, [headerRef]);

    return (
        <Provider store={store}>
        <Router>
            {/* Common Header */}
            <CommonHeader ref={headerRef} onLogout={handleLogout} />

            {/* Menu Icon Container Below Header */}
            <div
                style={{
                    position: 'fixed',
                    top: `${headerHeight + 85}px`, // Just below the header
                    left: 0,
                    width: '60px',  // Adjust the size of the icon button container
                    height: 'calc(100vh - 80px)', // Full height (from below header to bottom)
                    backgroundColor: '#4682B4', // Blue background
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 1200, // Ensure it's above other content
                    paddingTop: '10px',
                }}
            >
                {/* Menu Icon */}
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        fontSize: '3rem',  // Icon size
                        color: 'white',
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </div>

            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onToggleSidebar={toggleSidebar} />

            {/* Main content area */}
            <main
                style={{
                    display: 'flex',
                    justifyContent: 'center', // Ensure content is centered horizontally
                    marginLeft: sidebarOpen ? '240px' : '0', // Adjust main content's margin based on sidebar state
                    transition: 'margin-left 0.3s ease', // Smooth transition for the margin
                    marginTop: `${headerHeight + 10}px`, // Add space below header
                    padding: '20px', // Optional: padding for content
                    boxSizing: 'border-box', // Ensures padding is included in width calculation
                    overflowX: 'hidden', // Prevent overflow
                    width: `calc(100% - ${sidebarOpen ? '240px' : '0'})`, // Take the remaining width after sidebar
                    minHeight: 'calc(100vh - 80px)', // Ensure content takes up full height minus the header
                   
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '90%', // Maximum width for the content (adjust as needed)
                        display: 'flex', // Flexbox for centering
                        justifyContent: 'center', // Ensure it centers
                       
                        margin:'0 auto',
                        
                    }}
                >
                   <Routes>
                        <Route path="/budget-request" element={<BudgetRequest />} />
                        <Route path="/add-new-budget-request" element={<AddNewBudgetRequest />} />
                            <Route path="/budget-projection" element={<BudgetProjection />} />
                            <Route path="/add-new-budget-projection" element={<AddNewBudgetProjection />} />
                            <Route path="/budget-allotment" element={<BudgetAllotment />} />
                            <Route path="/add-new-budget-allotment" element={<AddNewBudgetAllotment />} />
                            <Route path="/budget-surrender" element={<BudgetSurrender />} />
                            <Route path="/add-new-budget-surrender" element={<AddNewBudgetSurrender />} />
                            <Route path="/expenditure-monitoring" element={<ExpenditureMonitoring/>} />
                            <Route path="/budget-withdrawal" element={<BudgetWithdrawal/>} />
                            <Route path="/process-recommendation" element={<ProcessRecommendation/>} />
                            <Route path="/request-recommendation" element={<RequestRecommendation/>} />
                            <Route path="/revenue-report" element={<RevenueReport/>} />
                            <Route path="/payment-form" element={<PaymentForm/>} />
                        </Routes>
                </div>
            </main>
        </Router>
        </Provider>
    );
};

export default App;
