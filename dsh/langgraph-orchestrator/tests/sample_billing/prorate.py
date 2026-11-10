"""按使用天数分摊周期费用。

应付 = 周期金额 * 已用天数 / 周期天数 - 已付。
周期天数必须大于 0；结果不得为负，保留两位小数。
"""


def prorate_fee(amount, days_used, days_in_period, already_paid=0):
    if days_in_period <= 0:
        raise ValueError("days_in_period")
    share = amount * days_used / days_in_period
    due = round(share - already_paid, 2)
    return 0 if due < 0 else due
