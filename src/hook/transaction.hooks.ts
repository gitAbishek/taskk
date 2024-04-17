import { useMutation } from "@tanstack/react-query";
import { post } from "../api/client";
import { getCookie } from "../utils/cookie";
import { AUTH_COOKIE_CONFIG } from "../constant/common";

export const useTransactionDetails = () =>
  useMutation({
    mutationFn: () =>
      post({
        url: `transaction-manager/v1/admin/dashboard/search`,
        body: {},
        header: {
          Authorization: `Bearer ${getCookie(AUTH_COOKIE_CONFIG.BEARER_TOKEN)}`,
        },
      }),
  });
