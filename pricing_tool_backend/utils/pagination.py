from rest_framework.pagination import PageNumberPagination
from utils.api_utils import success_response

class StandardResultPagination(PageNumberPagination):
    page_size              = 20
    page_size_query_param  = 'page_size'
    max_page_size          = 1000

    def get_paginated_response(self, data):
        return success_response(
            data={
                'count':    self.page.paginator.count,
                'next':     self.get_next_link(),
                'previous': self.get_previous_link(),
                'results':  data,
            }
        )
