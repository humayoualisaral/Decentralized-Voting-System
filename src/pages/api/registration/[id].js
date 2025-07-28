import connectToDatabase from '@/libs/mongodb.js';
import Registration from '@/models/Registration';

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
    
    // Try to find by registration ID first, then by CNIC
    let registration = await Registration.findByRegistrationId(id);
    
    if (!registration && /^\d{13}$/.test(id)) {
      registration = await Registration.findByCNIC(id);
    }
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found',
        message: 'No registration found with the provided ID or CNIC'
      });
    }
    
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
