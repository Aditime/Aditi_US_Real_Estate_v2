import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Level, Select, Box, Text,Icon,Button,Collapse,Divider,SimpleGrid,Input, } from "@chakra-ui/react";
import FormInput from "../components/FormInput";
import { PieChart } from "react-minimal-pie-chart";

const Mortgage = () => {
 
  const regex = new RegExp("^[0-9,]*$");
  
  const [mortgageParameter, setMortgageParameter] = useState({
    homePrice: 100000.00,
    downPayment: 1000.00,
    downPaymentParcent : 0, 
    loanTerm: 30,
    apr : 3.00, 
    propertyTax : 1000.00, 
    propertyTaxPercent : 10.00, 
    homeOwnerInsurance : 10.00, 
    hoaFees: 10.00
  });
  const [monthlyTotalPayment, setMonthlyTotalPayment] = useState(0);
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(0);
  const [monthlyPropertyTax, setMonthlyPropertyTax] = useState(0);


  useEffect(() => {
   // console.log("in useeffect : ", mortgageParameter);
    const principal_loan_amount = mortgageParameter.homePrice - mortgageParameter.downPayment
    const monthly_interest_rate = mortgageParameter.apr/(12*100)
    const months_payments = mortgageParameter.loanTerm * 12
    const monthly_mortgage_payment = principal_loan_amount *
    (monthly_interest_rate * ((1 + monthly_interest_rate) ** months_payments) ) 
    / ((1 + monthly_interest_rate)**months_payments  -1 )

    const propertyTax = (mortgageParameter.propertyTax === '')  ? 0 : parseInt(mortgageParameter.propertyTax)/12 ;
    const homeOwnerInsurance = (mortgageParameter.homeOwnerInsurance ==='')? 0: parseInt(mortgageParameter.homeOwnerInsurance) ; 
    const hoaFees = (mortgageParameter.hoaFees=== '') ? 0 : parseInt(mortgageParameter.hoaFees) ;

    let monthly_payment = monthly_mortgage_payment + propertyTax + homeOwnerInsurance + hoaFees;

    // console.log(propertyTax, mortgageParameter.propertyTax );
    setMonthlyMortgagePayment(monthly_mortgage_payment.toFixed(2));
    setMonthlyTotalPayment(monthly_payment.toFixed(2));
    setMonthlyPropertyTax((propertyTax).toFixed(2));
   
    
}, [mortgageParameter]);

  const onChangeParam = (e) => {
    const paramName = e.target.name;
    let paramValue = e.target.value.replace(',','');

    
    if (paramName === "downPayment"){
      const downPaymentParcentValue = parseInt(paramValue)/parseInt(mortgageParameter.homePrice)*100;   
      if (paramValue===""){
        setMortgageParameter((prevState) => ({...prevState,"downPaymentParcent": 0 }));
      }
      else{
        setMortgageParameter((prevState) => ({...prevState,"downPaymentParcent": downPaymentParcentValue }));
      }

      // console.log("downpayment: ", mortgageParameter.homePrice, paramValue, downPaymentParcentValue);
    }

    if (paramName === "propertyTax"){
      const propertyTaxParcentValue = parseInt(paramValue)/parseInt(mortgageParameter.homePrice)*100;   
      if (paramValue===""){
        setMortgageParameter((prevState) => ({...prevState,"propertyTaxParcent": 0 }));
      }
      else{
        setMortgageParameter((prevState) => ({...prevState,"propertyTaxPercent": propertyTaxParcentValue }));
      }

     // console.log("downpayment: ", mortgageParameter.homePrice, paramValue, propertyTaxParcentValue);
    }

      setMortgageParameter((prevState) => ({...prevState,
        [paramName]: paramValue
      }));
   
  };

  const pieData = [
    {
      color: "#728FCE",
      title: "Principal and interest",
      value: parseInt(monthlyTotalPayment),
    },
    {
      color: "#7E587E",  
      title: "Property Taxes",
      value: parseInt(mortgageParameter.propertyTax)/12,
    },
    {
      color: "#008080",
      title: "Monthly home insurance",
      value: parseInt(mortgageParameter.homeOwnerInsurance),
    },
    {
      color: "#DA8A67",
      title: "Hoa fees",
      value: parseInt(mortgageParameter.hoaFees),
    },
  ];


  return (
    <Box margin="5">
      <SimpleGrid columns={2} spacing={10}>
        <Box width="300" height="550" padding="2" border="1px" borderColor="gray.200"
        >
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )">ENTER HOME PRICE</Text>
            <label width="3%" height="7%"> $</label>
            <FormInput type="text" minLength={6} maxLength={12} name="homePrice" width="65%" height="7%" placeholder="100,000" 
            onChange={onChangeParam}  value ={mortgageParameter.homePrice}  
                onKeyPress={(e) => {
                  if (!regex.test(e.key)) {
                    e.preventDefault();
                  }
                }}       
            ></FormInput>
          </div>
          <br />
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )">ENTER DOWN PAYMENT</Text>
            <label width="3%" height="7%">$</label>
            <FormInput name="downPayment" value ={mortgageParameter.downPayment}  width="50%" height="7%" onChange={onChangeParam}
            onKeyPress={(e) => {
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
            ></FormInput>
            <FormInput name="downPaymentParcent" readOnly={true} value ={mortgageParameter.downPaymentParcent} width="14%" height="7%" marginLeft="1" onChange={onChangeParam}
            onKeyPress={(e) => {
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
            ></FormInput>
            <label width="3%" height="7%">%</label>
          </div>
          <br />
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )">SELECT LOAN TERM</Text>
            <Select name="loanTerm" width="50%" height="7%" onChange={onChangeParam}>
              <option value="30" selected="selected"> 30 years</option>
              <option value="20">20 years </option>
              <option value="10">10 years </option>
            </Select>
          </div>
          <br />
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )"> ENTER APR</Text>
            <FormInput name="apr" value ={mortgageParameter.apr} width="50%"  height="7%"  placeholder="3.42%" onChange={onChangeParam}></FormInput>
            <label width="3%" height="7%">% </label>
          </div>
          <br />
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )">PROPERTY TAXES</Text>
            <label width="3%" height="7%">$</label>
            <FormInput name="propertyTax" value ={mortgageParameter.propertyTax} width="43%" height="7%" placeholder="3,200" onChange={onChangeParam}
             onKeyPress={(e) => {
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
            ></FormInput>
            <label width="7%" height="7%">/year </label>
            <FormInput name="propertyTaxPercent" readOnly={true} value ={mortgageParameter.propertyTaxPercent} width="12%" height="7%" marginLeft="3" onChange={onChangeParam}
             onKeyPress={(e) => {
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
            ></FormInput>
            <label width="3%" height="7%"> %</label>
          </div>
          <br />
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )">HOME OWNER INSURANCE</Text>
            <label width="3%" height="7%">$</label>
            <FormInput name="homeOwnerInsurance" value ={mortgageParameter.homeOwnerInsurance} width="43%" height="7%" placeholder="111" onChange={onChangeParam}
             onKeyPress={(e) => {
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
            ></FormInput>
            <label width="7%" height="7%"> /month</label>
          </div>
          <br />
          <div>
            <Text bgGradient="linear(to-l, #90b2f5, #fcfdff )">HOMEOWNERS ASSOCIATION (HOA) FEES </Text>
            <label width="3%" height="7%">$</label>
            <FormInput name="hoaFees" value ={mortgageParameter.hoaFees} width="43%" height="7%" placeholder="0" onChange={onChangeParam}
            onKeyPress={(e) => {
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
            ></FormInput>
            <label width="7%" height="7%">/month</label>
          </div>
        </Box>

        <Box width="300" height="550" paddingTop="2" border="1px" borderColor="gray.200">
          <Text fontSize='xl' fontWeight= 'semibold'> Monthly Payment : ${monthlyTotalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / month </Text> <br/>
          <Text fontSize='lg' fontWeight= 'semibold' color='#728FCE'> Principal and Interest : ${monthlyMortgagePayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
          <Text fontSize='lg' fontWeight= 'semibold' color='#7E587E'> Property Taxes: ${monthlyPropertyTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
          <Text fontSize='lg' fontWeight= 'semibold' color='#008080'> Homeowners Insurance: ${mortgageParameter.homeOwnerInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
          <Text fontSize='lg' fontWeight= 'semibold' color='#DA8A67'> HOA Fees: ${mortgageParameter.hoaFees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
          <PieChart data={pieData}
                    center={[50, 35]}
                    lengthAngle={360}
                    lineWidth={75}
                    paddingAngle={10}
                    radius={30}  
                    startAngle={180}
                    viewBoxSize={[100, 100]}
                    />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Mortgage;
