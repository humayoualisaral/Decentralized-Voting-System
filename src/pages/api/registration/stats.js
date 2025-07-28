import connectToDatabase from '@/libs/mongodb.js';
import Registration from '@/models/Registration';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
  
  try {
    await connectToDatabase();
    
    const [statusStats, provinceStats, totalCount, recentRegistrations] = await Promise.all([
      // Status distribution
      Registration.getRegistrationStats(),
      
      // Province distribution
      Registration.aggregate([
        {
          $group: {
            _id: '$province',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // Total registrations
      Registration.countDocuments(),
      
      // Recent registrations (last 7 days)
      Registration.countDocuments({
        submissionTime: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      })
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        total: totalCount,
        recentRegistrations,
        statusDistribution: statusStats,
        provinceDistribution: provinceStats,
        generatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Stats Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve statistics'
    });
  }
}