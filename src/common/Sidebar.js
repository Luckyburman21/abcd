import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';

const Sidebar = ({ open, onToggleSidebar }) => {
    const navigate = useNavigate();

    const handleButtonClick = (page) => {
        switch (page) {
            // Existing pages
            case 'BudgetRequest':
                navigate('/budget-request');
                break;
                case 'AddNewBudgetRequest':
                    navigate('/add-new-budget-request');
                    break;
            case 'BudgetProjection':
                navigate('/budget-projection');
                break;
                case 'AddNewBudgetProjection':
                    navigate('/add-new-budget-projection');
                    break;
            case 'BudgetAllotment':
                navigate('/budget-allotment');
                break;
                case 'AddNewBudgetAllotment':
                    navigate('/add-new-budget-allotment');
                    break;
            case 'ExpenditureMonitoring':
                navigate('/expenditure-monitoring');
                break;
            case 'BudgetWithdrawal':
                navigate('/budget-withdrawal');
                break;
            case 'BudgetSurrender':
                navigate('/budget-surrender');
                break;
            case 'PaymentForm':
                navigate('/payment-form');
                break;

            // New pages
            case 'RequestForRecommendation':
                navigate('/request-recommendation');
                break;
            case 'ProcessRecommendation':
                navigate('/process-recommendation');
                break;
            case 'RevenueReport':
                navigate('/revenue-report');
                break;

            default:
                break;
        }
        onToggleSidebar(); // Close sidebar after click
    };

    return (
        <Drawer
            open={open}
            onClose={onToggleSidebar}
            sx={{
                width: 240,  
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    backgroundColor: '#4682B4', 
                    color: 'white', 
                    position: 'relative',
                    height: '100%', 
                    top: '95px', 
                    paddingTop: '20px', 
                    transition: 'top 0.3s', 
                    borderRight: '2px solid #34495e', 
                },
            }}
        >

            <IconButton
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    color: 'white', 
                }}
                onClick={onToggleSidebar}
            >
                <Close />
            </IconButton>

            <List>
                {/* Existing Links */}
                <ListItem button onClick={() => handleButtonClick('PaymentForm')} sx={listItemStyle}>
                    <ListItemText primary="Payment Form" sx={listItemTextStyle} />
                </ListItem>
                <ListItem button onClick={() => handleButtonClick('BudgetRequest')} sx={listItemStyle}>
                    <ListItemText primary="Budget Request" sx={listItemTextStyle} />
                </ListItem>
                <ListItem button onClick={() => handleButtonClick('BudgetProjection')} sx={listItemStyle}>
                    <ListItemText primary="  Budget Projection" sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('BudgetAllotment')} sx={listItemStyle}>
                    <ListItemText primary="Budget Allotment" sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('ExpenditureMonitoring')} sx={listItemStyle}>
                    <ListItemText primary="Expenditure Monitoring" sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('BudgetSurrender')} sx={listItemStyle}>
                    <ListItemText primary="Budget Surrender" sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('BudgetWithdrawal')} sx={listItemStyle}>
                    <ListItemText primary="Budget Withdrawal" sx={listItemTextStyle} />
                </ListItem>
                             {/* New Links */}
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('RequestForRecommendation')} sx={listItemStyle}>
                    <ListItemText primary="Request For Recommend And Approve " sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('ProcessRecommendation')} sx={listItemStyle}>
                    <ListItemText primary="Process Recommendation Approval " sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
                <ListItem button onClick={() => handleButtonClick('RevenueReport')} sx={listItemStyle}>
                    <ListItemText primary="Revenue Report" sx={listItemTextStyle} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#34495e' }} />
               
            </List>
        </Drawer>
    );
};

// Styles for ListItem
const listItemStyle = {
    marginTop: '20px',
    '&:hover': {
        backgroundColor: '#34495e', // Darker background on hover
    },
};

// Styles for ListItemText
const listItemTextStyle = {
    color: 'white', // White color for text
    fontWeight: '500', // Medium weight for readability
    cursor:'pointer',
    '&:hover': {
        color: '#ecf0f1', // Lighter text color on hover
    },
};

export default Sidebar;
