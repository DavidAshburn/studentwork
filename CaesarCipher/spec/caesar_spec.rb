require 'spec_helper'
require_relative '../app/caesar'

RSpec.describe 'Caesar Cipher' do
  describe 'caesar cipher method' do

    it 'wrapping works with lowercase' do
      expect(caesar("xanadu",12)).to eq("kmzmph")
    end

    it 'capital letters mixed in' do
      expect(caesar("TacoTruck",5)).to eq("YfhtYwzhp")
    end

    it 'large shift values' do
      expect(caesar("hijklmn",30)).to eq("lmnopqr")
    end

    it 'negative shift values' do
      expect(caesar("defg",-2)).to eq("bcde")
    end

    it 'large negative shift values' do
      expect(caesar("pecker",-30)).to eq("laygan")
    end

    it 'preserves spacing and characters' do
      expect(caesar("Street Fighter: Super Mega Taco !@$&$@! Edition",5))
        .to eq("Xywjjy Knlmyjw: Xzujw Rjlf Yfht !@$&$@! Jinynts")
    end

  end

end
