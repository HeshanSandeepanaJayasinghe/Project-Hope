import React, { useState, useContext } from 'react';
import { provincesData, divisionalSecretarialsData } from '../../data/sriLankanLocations';
import './VerificationForm.css';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const VerificationForm = () => {
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        province: '',
        district: '',
        divisionalSecretarial: '',
        gramaNiladhariDivision: '',
        accountNo: '',
        employmentCategory: '',
        occupation: '',
        annualSalary: '',
        assetStatus: '',
        numberOfFamilyMembers: '',
        longTermHealthIssues: '',
        agreeToTerms: false,
        verificationDocument: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'province' && { district: '', divisionalSecretarial: '' }),
            ...(name === 'district' && { divisionalSecretarial: '' })
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData({
                ...formData,
                verificationDocument: file
            });
        } else {
            toast.error('Please select a valid PDF file');
            e.target.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.agreeToTerms) {
            toast.error('You must agree to the terms and conditions');
            return;
        }

        if (!formData.verificationDocument) {
            toast.error('Please attach a verification document');
            return;
        }

        const submitData = new FormData();
        submitData.append('province', formData.province);
        submitData.append('district', formData.district);
        submitData.append('divisionalSecretarial', formData.divisionalSecretarial);
        submitData.append('gramaNiladhariDivision', formData.gramaNiladhariDivision);
        submitData.append('accountNo', formData.accountNo);
        submitData.append('employmentCategory', formData.employmentCategory);
        submitData.append('occupation', formData.occupation);
        submitData.append('annualSalary', formData.annualSalary);
        submitData.append('assetStatus', formData.assetStatus);
        submitData.append('numberOfFamilyMembers', formData.numberOfFamilyMembers);
        submitData.append('longTermHealthIssues', formData.longTermHealthIssues);
        submitData.append('verificationDocument', formData.verificationDocument);
        submitData.append('agreeToTerms', true);

        try {
            const response = await authAxios.post('/api/recipient/add/verification', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                toast.success('Verification request submitted successfully');
                setFormData({
                    province: '',
                    district: '',
                    divisionalSecretarial: '',
                    gramaNiladhariDivision: '',
                    accountNo: '',
                    employmentCategory: '',
                    occupation: '',
                    annualSalary: '',
                    assetStatus: '',
                    numberOfFamilyMembers: '',
                    longTermHealthIssues: '',
                    agreeToTerms: false,
                    verificationDocument: null
                });
            } else {
                toast.error('Error submitting verification request');
            }
        } catch (error) {
            toast.error('Error submitting verification request');
            console.error('Verification submission error:', error);
        }
    };

    const availableDistricts = formData.province 
        ? provincesData[formData.province]?.districts || [] 
        : [];

    const availableDivisionalSecretarials = formData.district 
        ? divisionalSecretarialsData[formData.district] || [] 
        : [];

    return (
        <div className="verification-layout">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="verification-form">
                <h2>Verification Request</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Province *</label>
                            <select name="province" value={formData.province} onChange={handleChange}>
                                <option value="">Select Province</option>
                                {Object.keys(provincesData).map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>District *</label>
                            <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.province}>
                                <option value="">Select District</option>
                                {availableDistricts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Divisional Secretarial *</label>
                            <select name="divisionalSecretarial" value={formData.divisionalSecretarial} onChange={handleChange} disabled={!formData.district}>
                                <option value="">Select Divisional Secretarial</option>
                                {availableDivisionalSecretarials.map((division) => (
                                    <option key={division} value={division}>
                                        {division}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Grama Niladhari Division *</label>
                            <input 
                                type="text"
                                name="gramaNiladhariDivision"
                                placeholder="GN Division"
                                value={formData.gramaNiladhariDivision}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Account Number *</label>
                            <input 
                                type="text"
                                name="accountNo"
                                placeholder="Your account number"
                                value={formData.accountNo}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Employment Category *</label>
                            <select name="employmentCategory" value={formData.employmentCategory} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="government">Government</option>
                                <option value="nongovernment">Non-Government</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Occupation *</label>
                            <input 
                                type="text"
                                name="occupation"
                                placeholder="Your occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Annual Salary (Rs.) *</label>
                            <input 
                                type="number"
                                name="annualSalary"
                                placeholder="Annual salary"
                                value={formData.annualSalary}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Asset Status *</label>
                            <input 
                                type="text"
                                name="assetStatus"
                                placeholder="Asset details"
                                value={formData.assetStatus}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>No. of Family Members *</label>
                            <input 
                                type="number"
                                name="numberOfFamilyMembers"
                                placeholder="Number of members"
                                value={formData.numberOfFamilyMembers}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Long Term Health Issues (Optional)</label>
                            <textarea 
                                name="longTermHealthIssues"
                                placeholder="Health issues if any"
                                value={formData.longTermHealthIssues}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Verification Document *</label>
                            <p className="form-description">Attach a pdf scan of Grama Niladhari certified document of annual salary information.</p>
                            <input 
                                type="file"
                                name="verificationDocument"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                required
                            />
                            {formData.verificationDocument && (
                                <p className="file-selected">File selected: {formData.verificationDocument.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="warning-note">
                        <p>Note: Your information is secure with us and filling out incorrect data may be subjected to permanent banning of the account</p>
                    </div>

                    <div className="checkbox-section">
                        <input 
                            type="checkbox"
                            id="agree-terms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />
                        <label htmlFor="agree-terms">I agree with all terms and conditions</label>
                    </div>

                    <button type="submit" className="submit-button">Request</button>
                </form>
            </div>
        </div>
    );
};

export default VerificationForm;
