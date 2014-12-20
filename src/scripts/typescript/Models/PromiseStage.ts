interface PromiseStage {
    name: string;
    fired: boolean;
    data;
    callback: Function;
}