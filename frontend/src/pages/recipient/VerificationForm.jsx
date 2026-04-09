import React, { useState } from 'react';
import { provincesData, divisionalSecretarialsData } from '../../data/sriLankanLocations';
import './VerificationForm.css';

const VerificationForm = () => {
    const [formData, setFormData] = useState({
        province: '',
        district: '',
        divisionalSecretarial: '',
        gramaNiladhari: '',
        employmentCategory: '',
        occupation: '',
        annualSalary: '',
        assetStatus: '',
        familyMembers: '',
        healthIssues: ''
    });
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            ...(name === 'province' && { district: '', divisionalSecretarial: '' }),
            ...(name === 'district' && { divisionalSecretarial: '' })
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Submit verification request to backend
    };

    const availableDistricts = formData.province 
        ? provincesData[formData.province]?.districts || [] 
        : [];

    const availableDivisionalSecretarials = formData.district 
        ? divisionalSecretarialsData[formData.district] || [] 
        : [];

    return (
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
                            name="gramaNiladhari"
                            placeholder="GN Division"
                            value={formData.gramaNiladhari}
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
                            name="familyMembers"
                            placeholder="Number of members"
                            value={formData.familyMembers}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Long Term Health Issues (Optional)</label>
                        <textarea 
                            name="healthIssues"
                            placeholder="Health issues if any"
                            value={formData.healthIssues}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="checkbox-section">
                    <input 
                        type="checkbox"
                        id="agree-terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label htmlFor="agree-terms">I agree with all terms and conditions</label>
                </div>

                <button type="submit" className="submit-button">Request</button>
            </form>
        </div>
    );
};

export default VerificationForm;
