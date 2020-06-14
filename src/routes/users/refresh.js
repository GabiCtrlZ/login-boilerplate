module.exports = async (req, res) => {
  try {
    const { userId } = req.user
    console.log('getting user data')

    return res.json({
      success: true,
      data: {
      },
    })
  } catch (e) {
    console.log('error with refresh route', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
