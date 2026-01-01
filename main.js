import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }
  
  try {
    // Sử dụng endpoint của tokcounter.com
    const response = await axios.get(`https://www.tiktok.com/node/share/user/@${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': `https://www.tiktok.com/@${username}`
      }
    });
    
    const data = response.data;
    
    if (data.userInfo && data.userInfo.user) {
      const user = data.userInfo.user;
      res.json({
        success: true,
        username: user.uniqueId,
        followers: user.stats.followerCount,
        following: user.stats.followingCount,
        likes: user.stats.heartCount,
        videos: user.stats.videoCount
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
