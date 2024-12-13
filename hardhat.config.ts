import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:5050", // URL padrão da Ganache
      accounts: [
        "0xa03cf99a5ad99c123677f256effb1af8daef3cc2b00d50e22da5ed15ceb33a48",
        "0xeed98686b793008277fea9820acc350e381bbd015d39303796c0a9a3de75ef9e",
        "0x70deae725b6909634a89c8d8b26b01b9e79db27f2e6ef4cc7bf7268fc033d76b",
        "0x4f28359ea82d51efcfbd11db35aa0bcd5f8a7831fb7ad2eaa404ca9c4bba757e",
        "0x5cb6e4308b0cd1da502b3187eab8b3e5b51e075f5e8c0525e0ab1acc82525fdb",
        "0x4a2713ab87d7cce7c289de6e2a705817b3e371a66d1a593415699c24173e3f1e",
        "0x9525f2aa851ac64e57b12afdbf41b2c2a589215ef90a116764ae6d2bf742e9fa",
        "0x76356c8ec151ff473d4d5fe0a804610cf7ba47ffe7710dd177e6fe5981dcbc1c",
        "0x16cfed2d60defbcfa314c3b29b0c39a3f10c850428f77c0f77a9fe36ab0528a7",
        "0xe683f02be294da47599fc9bf1f91c8703564514c095175e00ba1967f2cfdff18"
      ],
    },
  },
};

export default config;

