const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GotToken", function () {
  let gotToken;
  let owner;
  let user;
  const oneEther = ethers.parseEther("1.0");

  beforeEach(async function () {
    // 컨트랙트 배포
    const GotToken = await ethers.getContractFactory("GotToken");
    [owner, user] = await ethers.getSigners();
    gotToken = await GotToken.deploy();
  });

  describe("배포", function () {
    it("토큰 이름과 심볼이 올바르게 설정되어야 함", async function () {
      expect(await gotToken.name()).to.equal("Kumagotchi");
      expect(await gotToken.symbol()).to.equal("GOT");
    });

    it("초기 소유자가 올바르게 설정되어야 함", async function () {
      expect(await gotToken.owner()).to.equal(owner.address);
      console.log("owner address: ", owner.address);
    });
  });

  describe("토큰 민팅", function () {
    it("ETH를 보내면 동일한 양의 GOT 토큰을 받아야 함", async function () {
      await user.sendTransaction({
        to: gotToken.getAddress(),
        value: oneEther,
      });

      const balance = await gotToken.balanceOf(user.address);
      expect(balance).to.equal(oneEther);
    });

    it("0 ETH 전송 시 실패해야 함", async function () {
      await expect(
        user.sendTransaction({
          to: gotToken.getAddress(),
          value: 0,
        })
      ).to.be.revertedWith("Send ETH to receive tokens");
    });
  });

  describe("ETH 출금", function () {
    it("소유자가 ETH를 출금할 수 있어야 함", async function () {
      // 먼저 컨트랙트에 ETH 전송
      await user.sendTransaction({
        to: gotToken.getAddress(),
        value: oneEther,
      });

      const initialBalance = await ethers.provider.getBalance(owner.address);
      await gotToken.connect(owner).withdrawETH();
      const finalBalance = await ethers.provider.getBalance(owner.address);

      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("소유자가 아닌 계정은 ETH를 출금할 수 없어야 함", async function () {
      await expect(
        gotToken.connect(user).withdrawETH()
      ).to.be.revertedWithCustomError(gotToken, "OwnableUnauthorizedAccount");
    });
  });
});
