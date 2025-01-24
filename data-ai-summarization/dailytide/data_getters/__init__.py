"""Module to get data from different sources"""

import logging
import os
from datetime import datetime, timedelta

from dailytide.config import MakeConfig

DEFAULT_TIMEOUT = 30

# log config
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
current_date = datetime.now()

# cut off times
weekly_cutoff_time = (datetime.now() - timedelta(hours=24 * 5)).strftime(
    "%Y-%m-%dT%H:%M:%SZ"
)
daily_cutoff_time = (datetime.now() - timedelta(hours=24)).strftime(
    "%Y-%m-%dT%H:%M:%SZ"
)


# Twitter config
X_Accounts = [acc_id.strip() for acc_id in MakeConfig.X_ACCOUNTS]
