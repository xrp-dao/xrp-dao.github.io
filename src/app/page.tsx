"use client";

import React, { useEffect, useState } from "react";
import { Client, convertStringToHex } from "xrpl";
import xumm from "../utils/xumm";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  const [account, setAccount] = useState("");
  const [payloadUuid, setPayloadUuid] = useState("");
  const [lastPayloadUpdate, setLastPayloadUpdate] = useState("");
  const [waitingForSignature, setWaitingForSignature] = useState(false);
  const [openPayloadUrl, setOpenPayloadUrl] = useState("");
  const [appName, setAppName] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [email, setEmail] = useState("");

  /**
   * Set info
   */
  useEffect(() => {
    xumm.user.account.then((a) => setAccount(a ?? ""));
    xumm.environment.jwt?.then((j) => setAppName(j?.app_name ?? ""));
  }, []);

  /**
   * Get NFTs
   */
  useEffect(() => {
    (async () => {
      if (account) {
        const client = new Client("wss://s.altnet.rippletest.net:51233");
        await client.connect();

        const response = await client.request({
          command: "account_nfts",
          account,
          ledger_index: "validated",
        });
        console.log(response);

        client.disconnect();
      }
    })();
  });

  /**
   * @function login
   * @param event
   */
  const login = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    await xumm.authorize();
    setLoading(false);
  };

  /**
   * @function logout
   */
  const logout = () => {
    xumm.logout();
    setAccount("");
  };

  /**
   * @function handleEmailChange
   * @param event
   */
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  /**
   * @function createPayload
   * @param event
   * @returns
   */
  const createPayload = async (event: any) => {
    try {
      event.preventDefault();
      const payload = await xumm.payload?.createAndSubscribe(
        // {
        //   TransactionType: "Payment",
        //   Destination: "r3Ptti6AgVTeteThcgCwQRQ3vBa2hYYZ8",
        //   Account: account,
        //   Amount: String(1337),
        // },
        {
          txjson: {
            TransactionType: "NFTokenMint",
            Account: account,
            URI: convertStringToHex("http://localhost:3003/metadata.json"),
            Flags: 2,
            TransferFee: 0,
            NFTokenTaxon: 0,
          },
          options: {
            force_network: "TESTNET",
          },
        },
        (event) => {
          console.log({ event });
          // Return if signed or not signed (rejected)
          setLastPayloadUpdate(JSON.stringify(event.data, null, 2));

          // Only return (websocket will live till non void)
          if (Object.keys(event.data).indexOf("signed") > -1) {
            setWaitingForSignature(false);
            setTransactionComplete(true);
            return true;
          }
        }
      );
      console.log({ payload });
      setWaitingForSignature(true);

      if (payload) {
        setPayloadUuid(payload.created.uuid);

        if (xumm.runtime.xapp) {
          xumm.xapp?.openSignRequest(payload.created);
        } else {
          if (
            payload.created.pushed &&
            payload.created.next?.no_push_msg_received
          ) {
            setOpenPayloadUrl(payload.created.next.no_push_msg_received);
          } else {
            window.open(payload.created.next.always);
          }
        }
      }

      return payload;
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal fade" tabIndex={-1} id="terms">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Terms of Use</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Each person can only hold one membership NFT. This will be
                enforced at a future date by requiring KYC/B for all DAO
                members. The reason we require KYC/B is to ensure members are
                represented on a 1:1 basis with the membership NFT. All funds
                are held in escrow with a digital asset custodian.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              XRP DAO
            </h1>
            <h2>Membership NFT</h2>
            <p className="col-lg-10 fs-4">
              XRP DAO is the first global collective enterprise organized by XRP
              holders with the purpose of improving utility of the XRP Ledger.
              We aim to create a cooperative member-owned banking institution
              that runs on the XRP Ledger.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
              {account === "" && !xumm.runtime.xapp ? (
                loading ? (
                  <>
                    <h4 className="text-center pb-3">Logging in...</h4>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-center mb-3">Become a member today</h3>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={login}
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </>
                )
              ) : waitingForSignature ? (
                <div className="d-flex justify-content-center">
                  Please sign the transaction in the Xaman app.
                </div>
              ) : transactionComplete ? (
                <>Transaction complete.</>
              ) : (
                <>
                  <label className="form-label">Email</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    <small className="text-muted">
                      We&apos;ll send the Discord private server invite link
                      here.
                    </small>
                  </div>
                  <label className="form-label">Pay From</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={account}
                      disabled
                      readOnly
                    />
                  </div>
                  <label className="form-label">Amount</label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      value={50}
                      disabled
                      readOnly
                    />
                    <span className="input-group-text">XRP</span>
                  </div>

                  <button
                    className="w-100 btn btn-lg btn-primary"
                    onClick={createPayload}
                    disabled={!email}
                  >
                    Purchase
                  </button>
                  <hr className="my-4" />
                  <small className="text-body-secondary">
                    By clicking Purchase, you agree to the{" "}
                    <a
                      className="text-link"
                      href="/#/"
                      data-bs-toggle="modal"
                      data-bs-target="#terms"
                    >
                      terms of use
                    </a>
                    .
                  </small>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
