const Wallet = require("../models/wallet")

const expensesReport = async (req, res) => {
    try {
        const user = req.user
        const report = await Wallet.find({ owner: user }).populate("transactions")
        console.log("🚀 ~ expensesReport ~ report:", report[0].transactions)
        return res.status(200).json({
            total_balance: 0,
            last_30_days: 0,
            last_7_days: 0
        })
    } catch (error) {
        console.log("🚀 ~ expensesReport ~ error:", error)
        return res.status(500).json({ error: "failed to fetch expenses report" })

    }
}

module.exports = {
    expensesReport
}