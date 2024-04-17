import { useMutation } from "@tanstack/react-query";
import { post } from "../api/client";

export const useLoginAccount = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "config/v1/auths/login",
        body,
      }),
  });
