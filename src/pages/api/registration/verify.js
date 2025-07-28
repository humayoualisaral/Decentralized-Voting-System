import connectToDatabase from '../../../libs/mongodb';
import Registration from '../../../models/Registration';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
  
  try {
    await connectToDatabase();
    
    const { registrationId, cnicNumber, action, notes } = req.body;
    
    if (!registrationId && !cnicNumber) {
      return res.status(400).json({
        success: false,
        error: 'Registration ID or CNIC number is required'
      });
    }
    
    // Find registration
    let registration;
    if (registrationId) {
      registration = await Registration.findByRegistrationId(registrationId);
    } else {
      registration = await Registration.findByCNIC(cnicNumber);
    }
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found'
      });
    }
    
    // Perform action
    if (action === 'verify') {
      await registration.verifyRegistration(notes);
      
      res.status(200).json({
        success: true,
        message: 'Registration verified successfully',
        data: {
          registrationId: registration.registrationId,
          status: registration.status,
          verificationDate: registration.verificationDate
        }
      });
      
    } else if (action === 'reject') {
      await registration.rejectRegistration(notes);
      
      res.status(200).json({
        success: true,
        message: 'Registration rejected',
        data: {
          registrationId: registration.registrationId,
          status: registration.status
        }
      });
      
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid action. Use "verify" or "reject"'
      });
    }
    
  } catch (error) {
    console.error('❌ Verification Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Verification failed due to server error'
    });
  }
}
