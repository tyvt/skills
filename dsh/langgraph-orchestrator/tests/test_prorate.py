import pytest

from tests.sample_billing.prorate import prorate_fee


def test_half_period_minus_paid():
    assert prorate_fee(200, 15, 30, already_paid=40) == 60


def test_overpay_floors_at_zero():
    assert prorate_fee(100, 1, 10, already_paid=50) == 0


def test_full_period():
    assert prorate_fee(80, 28, 28) == 80


def test_rejects_empty_period():
    with pytest.raises(ValueError):
        prorate_fee(10, 1, 0)
