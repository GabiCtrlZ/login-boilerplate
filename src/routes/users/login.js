module.exports = async (req, res) => {
  const { logger } = req
  try {
    const { userId } = req.user
    logger.info('getting user data')


    return res.json({
      success: true,
      data: {
      },
    })
  } catch (e) {
    logger.info('error with login route', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
