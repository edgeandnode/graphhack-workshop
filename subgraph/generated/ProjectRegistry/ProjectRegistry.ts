// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ProjectUpdated extends ethereum.Event {
  get params(): ProjectUpdated__Params {
    return new ProjectUpdated__Params(this);
  }
}

export class ProjectUpdated__Params {
  _event: ProjectUpdated;

  constructor(event: ProjectUpdated) {
    this._event = event;
  }

  get projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get name(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get subtitle(): string {
    return this._event.parameters[3].value.toString();
  }

  get description(): string {
    return this._event.parameters[4].value.toString();
  }

  get imageUrl(): string {
    return this._event.parameters[5].value.toString();
  }

  get upvotes(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get downvotes(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get voteCount(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }
}

export class VoteSubmitted extends ethereum.Event {
  get params(): VoteSubmitted__Params {
    return new VoteSubmitted__Params(this);
  }
}

export class VoteSubmitted__Params {
  _event: VoteSubmitted;

  constructor(event: VoteSubmitted) {
    this._event = event;
  }

  get projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get vote(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

export class ProjectRegistry__getProjectResultValue0Struct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get name(): string {
    return this[1].toString();
  }

  get subtitle(): string {
    return this[2].toString();
  }

  get imageUrl(): string {
    return this[3].toString();
  }

  get description(): string {
    return this[4].toString();
  }

  get upvotes(): BigInt {
    return this[5].toBigInt();
  }

  get downvotes(): BigInt {
    return this[6].toBigInt();
  }
}

export class ProjectRegistry__projectsResult {
  value0: Address;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: BigInt;
  value6: BigInt;

  constructor(
    value0: Address,
    value1: string,
    value2: string,
    value3: string,
    value4: string,
    value5: BigInt,
    value6: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    map.set("value4", ethereum.Value.fromString(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    return map;
  }
}

export class ProjectRegistry extends ethereum.SmartContract {
  static bind(address: Address): ProjectRegistry {
    return new ProjectRegistry("ProjectRegistry", address);
  }

  getProject(
    _projectId: BigInt
  ): ProjectRegistry__getProjectResultValue0Struct {
    let result = super.call(
      "getProject",
      "getProject(uint256):((address,string,string,string,string,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return changetype<ProjectRegistry__getProjectResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getProject(
    _projectId: BigInt
  ): ethereum.CallResult<ProjectRegistry__getProjectResultValue0Struct> {
    let result = super.tryCall(
      "getProject",
      "getProject(uint256):((address,string,string,string,string,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<ProjectRegistry__getProjectResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getProjectOwner(_projectId: BigInt): Address {
    let result = super.call(
      "getProjectOwner",
      "getProjectOwner(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return result[0].toAddress();
  }

  try_getProjectOwner(_projectId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getProjectOwner",
      "getProjectOwner(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getProjectVote(_projectId: BigInt, _voter: Address): i32 {
    let result = super.call(
      "getProjectVote",
      "getProjectVote(uint256,address):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(_projectId),
        ethereum.Value.fromAddress(_voter)
      ]
    );

    return result[0].toI32();
  }

  try_getProjectVote(
    _projectId: BigInt,
    _voter: Address
  ): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "getProjectVote",
      "getProjectVote(uint256,address):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(_projectId),
        ethereum.Value.fromAddress(_voter)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  projectOwnerSeqIds(param0: Address): BigInt {
    let result = super.call(
      "projectOwnerSeqIds",
      "projectOwnerSeqIds(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_projectOwnerSeqIds(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "projectOwnerSeqIds",
      "projectOwnerSeqIds(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  projectOwners(param0: BigInt): Address {
    let result = super.call(
      "projectOwners",
      "projectOwners(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_projectOwners(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "projectOwners",
      "projectOwners(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  projectVotes(param0: BigInt, param1: Address): i32 {
    let result = super.call(
      "projectVotes",
      "projectVotes(uint256,address):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return result[0].toI32();
  }

  try_projectVotes(param0: BigInt, param1: Address): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "projectVotes",
      "projectVotes(uint256,address):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  projects(param0: BigInt): ProjectRegistry__projectsResult {
    let result = super.call(
      "projects",
      "projects(uint256):(address,string,string,string,string,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new ProjectRegistry__projectsResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toString(),
      result[3].toString(),
      result[4].toString(),
      result[5].toBigInt(),
      result[6].toBigInt()
    );
  }

  try_projects(
    param0: BigInt
  ): ethereum.CallResult<ProjectRegistry__projectsResult> {
    let result = super.tryCall(
      "projects",
      "projects(uint256):(address,string,string,string,string,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new ProjectRegistry__projectsResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toString(),
        value[3].toString(),
        value[4].toString(),
        value[5].toBigInt(),
        value[6].toBigInt()
      )
    );
  }
}

export class SubmitProjectCall extends ethereum.Call {
  get inputs(): SubmitProjectCall__Inputs {
    return new SubmitProjectCall__Inputs(this);
  }

  get outputs(): SubmitProjectCall__Outputs {
    return new SubmitProjectCall__Outputs(this);
  }
}

export class SubmitProjectCall__Inputs {
  _call: SubmitProjectCall;

  constructor(call: SubmitProjectCall) {
    this._call = call;
  }

  get _metadata(): SubmitProjectCall_metadataStruct {
    return changetype<SubmitProjectCall_metadataStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class SubmitProjectCall__Outputs {
  _call: SubmitProjectCall;

  constructor(call: SubmitProjectCall) {
    this._call = call;
  }
}

export class SubmitProjectCall_metadataStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get subtitle(): string {
    return this[1].toString();
  }

  get imageUrl(): string {
    return this[2].toString();
  }

  get description(): string {
    return this[3].toString();
  }
}

export class UpdateProjectMetadataCall extends ethereum.Call {
  get inputs(): UpdateProjectMetadataCall__Inputs {
    return new UpdateProjectMetadataCall__Inputs(this);
  }

  get outputs(): UpdateProjectMetadataCall__Outputs {
    return new UpdateProjectMetadataCall__Outputs(this);
  }
}

export class UpdateProjectMetadataCall__Inputs {
  _call: UpdateProjectMetadataCall;

  constructor(call: UpdateProjectMetadataCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _metadata(): UpdateProjectMetadataCall_metadataStruct {
    return changetype<UpdateProjectMetadataCall_metadataStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }
}

export class UpdateProjectMetadataCall__Outputs {
  _call: UpdateProjectMetadataCall;

  constructor(call: UpdateProjectMetadataCall) {
    this._call = call;
  }
}

export class UpdateProjectMetadataCall_metadataStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get subtitle(): string {
    return this[1].toString();
  }

  get imageUrl(): string {
    return this[2].toString();
  }

  get description(): string {
    return this[3].toString();
  }
}

export class VoteCall extends ethereum.Call {
  get inputs(): VoteCall__Inputs {
    return new VoteCall__Inputs(this);
  }

  get outputs(): VoteCall__Outputs {
    return new VoteCall__Outputs(this);
  }
}

export class VoteCall__Inputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _vote(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class VoteCall__Outputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }
}
