import connectToDatabase from '../../../libs/mongodb';
import Registration from '../../../models/Registration';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
  
  try {
    await connectToDatabase();
    
    console.log('🔍 Searching for registration with ID:', id);
    
    // Try to find by registration ID first
    let registration = await Registration.findByRegistrationId(id);
    console.log('📋 Found by registration ID:', !!registration);
    
    // If not found and looks like a CNIC (13 digits), search by CNIC
    if (!registration && /^\d{13}$/.test(id)) {
      console.log('🆔 Searching by CNIC:', id);
      
      // Try multiple approaches for CNIC search
      registration = await Registration.findByCNIC(id);
      
      // If custom method doesn't work, try direct query
      if (!registration) {
        console.log('🔄 Trying direct CNIC query...');
        registration = await Registration.findOne({ cnicNumber: id });
      }
      
      // Try as string and number
      if (!registration) {
        console.log('🔄 Trying CNIC as number...');
        registration = await Registration.findOne({ 
          $or: [
            { cnicNumber: id },
            { cnicNumber: parseInt(id) },
            { cnic: id }, // In case field name is different
            { cnic: parseInt(id) }
          ]
        });
      }
      
      console.log('📋 Found by CNIC:', !!registration);
    }
    
    if (!registration) {
      console.log('❌ No registration found for:', id);
      return res.status(404).json({
        success: false,
        error: 'Registration not found',
        message: 'No registration found with the provided ID or CNIC'
      });
    }
    
    console.log('✅ Registration found:', registration.registrationId || registration._id);
    
    // Return registration data (exclude sensitive biometric raw data)
    const responseData = {
      success: true,
      data: {
        registrationId: registration.registrationId,
        cnicNumber: registration.cnicNumber,
        firstName: registration.firstName,
        lastName: registration.lastName,
        dateOfBirth: registration.dateOfBirth,
        province: registration.province,
        constituency: registration.constituency,
        status: registration.status,
        isVerified: registration.isVerified,
        submissionTime: registration.submissionTime,
        verificationDate: registration.verificationDate,
        biometricRegistered: !!registration.biometricData,
        biometricTimestamp: registration.biometricData?.timestamp
      }
    };
    
    res.status(200).json(responseData);
    
  } catch (error) {
    console.error('❌ Get Registration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve registration data'
    });
  }
}