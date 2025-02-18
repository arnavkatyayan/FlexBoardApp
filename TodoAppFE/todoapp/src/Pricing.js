import React from "react";
import { Button,Modal } from "react-bootstrap";

function Pricing() {
    const pricingPlans = [
        {
          name: "Basic",
          features: {
            projects: 1,
            todos: 10,
          },
          pricing: {
            yearly: 0,
            monthly: 0,
          },
        },
        {
          name: "Pro",
          features: {
            projects: 10,
            todos: "Unlimited",
          },
          pricing: {
            yearly: 2400, 
            monthly: 250,
          },
        },
        {
          name: "Premium",
          features: {
            projects: 25,
            todos: "Unlimited",
          },
          pricing: {
            yearly: 8000, 
            monthly: 1000, 
          },
        },
      ];
      
      

      return (
        <div className='Main-Page'>
          <div className="login-page shrink-size">
            <h4 className="top-alignment font-weight-props">{pricingPlans[0].name}</h4>
            <hr className="vertical-line" />
            <h5 className="top-alignment heading-margin-top">Ideal for Solo Developers</h5>
      
            <div className="grid-arrangement top-alignment">
              <h6> ✅ Manage 1 Project</h6>
              <h6> ✅ Track up to 10 To-Do Tasks</h6>
              <h6> ✅ Basic Task Organization </h6>
              <h6> ✅ No Cost – Completely Free!</h6>
            </div>
            <Button className="pricing-btn">Buy</Button>
          </div>
      
          <div className="login-page shrink-size">
            <h4 className="top-alignment font-weight-props">{pricingPlans[1].name}</h4>
            <hr className="vertical-line" />
            <h5 className="top-alignment heading-margin-top">Perfect for Small Teams & Freelancers</h5>
      
            <div className="grid-arrangement top-alignment">
              <h6> ✅ Manage up to 10 Projects</h6>
              <h6> ✅ Track up to 50 To-Do Tasks</h6>
              <h6> ✅ Advanced Task Organization</h6>
              <h6> ✅ Collaboration & Team Support</h6>
              <h6> ✅ Affordable at ₹250/month or ₹2400/year</h6>
            </div>
            <Button className="pricing-btn">Buy</Button>
          </div>
      
          <div className="login-page shrink-size">
            <h4 className="top-alignment font-weight-props">{pricingPlans[2].name}</h4>
            <hr className="vertical-line" />
            <h5 className="top-alignment heading-margin-top">Best for Large Teams & Enterprises</h5>
      
            <div className="grid-arrangement top-alignment">
              <h6> ✅ Manage up to 25 Projects</h6>
              <h6> ✅ Unlimited To-Do Tasks</h6>
              <h6> ✅ Priority Support & Custom Integrations</h6>
              <h6> ✅ Advanced Reporting & Analytics</h6>
              <h6> ✅ ₹1000/month or ₹8000/year</h6>
            </div>
            <Button className="pricing-btn">Buy</Button>
          </div>
        </div>
      );
      
} export default Pricing;