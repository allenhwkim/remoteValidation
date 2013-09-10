class Blog < ActiveRecord::Base
  attr_accessible :text, :title
  validates :text, :presence => true
  validates :title, :presence => true
end
